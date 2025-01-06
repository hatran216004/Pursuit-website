import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

export function useLogout() {
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAppContext();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem('user');
      queryClient.removeQueries();
      setIsAuthenticated(false);
      toast.success('Logout successfully');
    }
  });

  return { logout, isLoading };
}
