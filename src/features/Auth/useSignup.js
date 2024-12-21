import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate('/login');
    }
  });

  return { singup, isLoading };
}
