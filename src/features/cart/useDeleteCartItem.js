import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCartItem as deleteCartItemApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const { mutate: deleteCartItem, isLoading } = useMutation({
    mutationFn: deleteCartItemApi,
    onSuccess: () => {
      toast.success('Delete item successfully');
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    }
  });

  return { deleteCartItem, isLoading };
}
