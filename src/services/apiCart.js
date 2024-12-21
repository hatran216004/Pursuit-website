import supabase from './supabase';

export async function createCart(cartData) {
  const { data: existingItem } = await supabase
    .from('cart')
    .select('*')
    .eq('productId', cartData.productId)
    .eq('user_id', cartData.user_id)
    .single();

  if (!existingItem) {
    const { error } = await supabase.from('cart').insert([cartData]);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from('cart')
      .update({ quantity: existingItem.quantity + cartData.quantity })
      .eq('id', existingItem.id);

    if (error) throw new Error(error.message);
  }

  return existingItem;
}

export async function getUserCart(user_id) {
  const { data, error } = await supabase
    .from('cart')
    .select('*, productId(name, discountPrice, regularPrice, image, stock)')
    .eq('user_id', user_id)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCartItem({ cartId, quantity }) {
  const { data, error } = await supabase
    .from('cart')
    .update({ quantity: quantity })
    .eq('id', cartId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCartItem(cartId) {
  const { error } = await supabase.from('cart').delete().eq('id', cartId);

  if (error) throw new Error(error.message);
}

export async function deleteCart(userId) {
  const { error } = await supabase.from('cart').delete().eq('user_id', userId);
  if (error) throw new Error(error.message);
}
