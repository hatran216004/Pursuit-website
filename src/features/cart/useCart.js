import { useQuery } from '@tanstack/react-query';
import { getUserCart } from '../../services/apiCart';
import { useUser } from '../Auth/useUser';

export function useCart() {
  const { user } = useUser();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getUserCart(user.id),
    enabled: Boolean(user)
  });

  return { cart, isLoading };
}
