import { useMutation } from '@tanstack/react-query';
import { updateOrder as updateOrderApi } from '../../services/apiOrder';

export function useUpdateOrder() {
  const { mutate: updateOrder, isLoading } = useMutation({
    mutationFn: updateOrderApi
  });
  return { updateOrder, isLoading };
}
