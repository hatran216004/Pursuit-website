import { useMutation } from '@tanstack/react-query';
import { deletePayment as deletePaymentApi } from '../../services/apiPayment';

export function useDeletePayment() {
  const { mutate: deletePayment, isLoading } = useMutation({
    mutationFn: deletePaymentApi
  });

  return { deletePayment, isLoading };
}
