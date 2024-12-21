import { PAGE_SIZE } from '../utils/constant';
import supabase from './supabase';

export async function getProducts({
  filterCate,
  filterRating,
  maxStart = 5,
  price,
  sortBy,
  searchValue,
  page
}) {
  const { fromPrice, toPrice } = price;
  let query = supabase.from('product').select('*, category(name)', {
    count: 'exact'
  });

  if (filterCate) {
    query = query.eq('categoryId', filterCate);
  }

  if (filterRating) {
    query = query
      .gte('ratingAverage', filterRating)
      .lte('ratingAverage', maxStart);
  }

  if (fromPrice && toPrice) {
    query = query.gte('regularPrice', fromPrice).lte('regularPrice', toPrice);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc'
    });
  }

  if (searchValue) {
    query = query.ilike('name', `%${searchValue}%`);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE; // page = 1 =>  from = 0
    const to = from + PAGE_SIZE - 1; // to = 5
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error('Products could not be loaded');

  return { data, count };
}

export async function getProduct(productId) {
  const { data, error } = await supabase
    .from('product')
    .select('*, category(*)')
    .eq('id', productId)
    .single();

  if (error) throw new Error('Product could not be loaded');

  return data;
}

export async function getProductsSimilar(categoryId) {
  let { data, error } = await supabase
    .from('product')
    .select('*, category(*)')
    .eq('categoryId', categoryId);

  if (error) throw new Error('Product could not be loaded');

  return data;
}

export async function updateStockAfterOrder(userId) {
  const { data: cart, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId);

  const productIds = cart.map((item) => item.productId);

  const { data: products, error: productError } = await supabase
    .from('product')
    .select('*')
    .in('id', productIds);

  const updates = cart.map((item) => {
    const product = products.find((ele) => ele.id === item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found.`);
    }
    return {
      id: product.id,
      stock: product.stock - item.quantity
    };
  });

  const promises = updates.map((item) => {
    const product = supabase
      .from('product')
      .update({ stock: item.stock })
      .eq('id', item.id);
    return product;
  });

  await Promise.all(promises);

  if (error || productError) throw new Error('Something went wrong');
}
