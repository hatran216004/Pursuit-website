import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAppContext();

  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['user'], user);
      localStorage.setItem('user', JSON.stringify(user.id));
      setIsAuthenticated(true);

      navigate('/', { replace: true });
      toast.success('Login successfully');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Provided email or password are incorrect');
    }
  });

  return { login, isLogging };
}

export default useLogin;
