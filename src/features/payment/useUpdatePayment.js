import { useMutation } from '@tanstack/react-query';
import { updatePayment as updatePaymentApi } from '../../services/apiPayment';

export function useUpdatePayment() {
  const { mutate: updatePayment, isLoading } = useMutation({
    mutationFn: updatePaymentApi
  });

  return { updatePayment, isLoading };
}
