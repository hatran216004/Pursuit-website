import { useMutation } from '@tanstack/react-query';
import { createPayment as createPaymentApi } from '../../services/apiPayment';

export function useCreatePayment() {
  const { mutate: createPayment, isLoading } = useMutation({
    mutationFn: createPaymentApi
  });

  return { createPayment, isLoading };
}
