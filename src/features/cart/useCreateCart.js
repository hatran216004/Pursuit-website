import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCart as createCartApi } from '../../services/apiCart';
import toast from 'react-hot-toast';

function useCreateCart() {
  const queryClient = useQueryClient();

  const { mutate: createCart, isLoading: isCreating } = useMutation({
    mutationFn: createCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
      toast.success('Success');
    }
  });

  return { createCart, isCreating };
}

export default useCreateCart;
