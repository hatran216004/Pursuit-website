import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '../../services/apiOrder';
import { useUser } from '../Auth/useUser';

function useUserOrders() {
  const { user } = useUser();

  const { data: userOrders, isLoading } = useQuery({
    queryKey: ['user-orders'],
    queryFn: () => getUserOrders(user.id),
    enabled: Boolean(user)
  });

  return { userOrders, isLoading };
}

export default useUserOrders;
