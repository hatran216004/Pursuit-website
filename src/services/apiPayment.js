import axios from 'axios';
import supabase from './supabase';

export async function createPaymentLink(formData) {
  try {
    const res = await axios.post(import.meta.env.VITE_ORDER_URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': import.meta.env.VITE_CLIENT_ID,
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function cancelOrder(orderId) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_ORDER_URL}/${orderId}/cancel`,
      {
        cancellationReason: 'Changed my mind'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': import.meta.env.VITE_CLIENT_ID,
          'x-api-key': import.meta.env.VITE_API_KEY
        }
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function createPayment(paymentData) {
  const { data, error } = await supabase
    .from('payments')
    .insert([paymentData])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updatePayment({ orderId, paymentLinkId, status }) {
  // CANCELLED, PAID, PENDING
  const { data, error } = await supabase
    .from('payments')
    .update({ paymentLinkId, status })
    .eq('orderId', orderId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deletePayment(id) {
  const { error } = await supabase.from('payments').delete().eq('id', id);

  if (error) throw new Error(error.message);
}
