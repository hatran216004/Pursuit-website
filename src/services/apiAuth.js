import toast from 'react-hot-toast';
import supabase, { supabaseUrl } from './supabase';

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // getSession() sẽ lấy thông tin phiên đăng nhập hiện tại từ localStorage nếu người dùng đã đăng nhập trước đó
  const { data: session } = await supabase.auth.getSession();
  // Chưa đăng nhập hoặc phiên đã hết hạn => return null
  if (!session.session) return null;

  // Thông tin user hiện tại dựa trên phiên đăng nhập
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signup({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateCurrentUser({ password, username, address }) {
  let updateData;
  if (password) updateData = { password };
  else updateData = { data: { username, address } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  return data;
}

export async function updateCurrentUserAvatar({ avatar, userId }) {
  const fileName = `avatar-${userId}-${Math.random()}.jpg`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) toast.error(storageError.message);

  const { data: updatedUser, error: errorUpdatedUser } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
      }
    });

  if (errorUpdatedUser) throw new Error(errorUpdatedUser.message);
  return updatedUser;
}
