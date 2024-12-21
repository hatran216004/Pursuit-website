import supabase from './supabase';

export async function createOrder(newOrder) {
  const { data: order, error: orderError } = await supabase
    .from('order')
    .insert([newOrder])
    .select();

  const { data: cart, error: cartError } = await supabase
    .from('cart')
    .select(
      'quantity, size, productId(id, discountPrice, regularPrice, image, name)'
    )
    .eq('user_id', newOrder.user_id);

  const dataOrderDetail = cart.map((item) => {
    const {
      productId: { id, discountPrice, regularPrice, image, name },
      quantity,
      size
    } = item;
    return {
      orderId: order[0].id,
      productId: id,
      quantity,
      price: (regularPrice - discountPrice) * quantity,
      size,
      image,
      name
    };
  });

  const { error: orderDetailError } = await supabase
    .from('orderDetail')
    .insert(dataOrderDetail)
    .select();

  if (orderError || cartError || orderDetailError)
    throw new Error('Something went wrong!');

  return order;
}

export async function updateOrder({ orderId, status }) {
  const { data, error } = await supabase
    .from('order')
    .update({ status })
    .eq('id', orderId)
    .select();

  if (error) throw new Error('Something went wrong!');

  return data;
}

export async function getUserOrders(userId) {
  const { data: orders, error: orderError } = await supabase
    .from('order')
    .select('*')
    .eq('user_id', userId);

  if (orderError) throw new Error('Something went wrong!');

  const orderIds = orders.map((order) => order.id);

  const { data: ordersDetail, error } = await supabase
    .from('orderDetail')
    .select('*')
    .in('orderId', orderIds);

  if (error) throw new Error('Something went wrong!');

  return { orders, ordersDetail };
}
