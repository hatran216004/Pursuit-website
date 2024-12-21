import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../services/apiProduct';
import { useParams } from 'react-router-dom';

function useProduct() {
  const { productId } = useParams();
  const {
    data: product,
    error,
    isLoading
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId)
  });

  return { product, error, isLoading };
}

export default useProduct;
