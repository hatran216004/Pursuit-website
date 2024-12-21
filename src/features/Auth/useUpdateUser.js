import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      toast.success('Updated successfully');
      queryClient.setQueryData(['user'], data.user);
    },
    onError: () => toast.error('Something went wrong')
  });

  return { updateUser, isLoading };
}

export default useUpdateUser;
