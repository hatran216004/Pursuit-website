import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCart as deleteCartApi } from '../../services/apiCart';

export function useDeleteCart() {
  const queryClient = useQueryClient();

  const { mutate: deleteCart, isLoading } = useMutation({
    mutationFn: deleteCartApi,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    }
  });

  return { deleteCart, isLoading };
}
