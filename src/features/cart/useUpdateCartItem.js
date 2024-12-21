import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItem as updateCartItemApi } from '../../services/apiCart';

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  const { mutate: updateCartItem, isLoading: isUpdating } = useMutation({
    mutationFn: ({ cartId, quantity }) =>
      updateCartItemApi({ cartId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    }
  });

  return { updateCartItem, isUpdating };
}
