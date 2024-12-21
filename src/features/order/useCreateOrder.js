import { useMutation } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '../../services/apiOrder';

export function useCreateOrder() {
  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: createOrderApi
  });
  return { createOrder, isLoading };
}
