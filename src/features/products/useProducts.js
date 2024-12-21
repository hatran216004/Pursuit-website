import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '../../services/apiProduct';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constant';

export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterCate = Number(searchParams.get('category'));
  const filterRating = Number(searchParams.get('ratingAverage'));

  // SortBy
  const sortByRaw = searchParams.get('sortBy') ?? 'regularPrice-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Search
  const searchValue = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page') ?? 1);

  const price = {
    fromPrice: Number(searchParams.get('price_min')),
    toPrice: Number(searchParams.get('price_max'))
  };

  const { data: { data: products, count } = {}, isLoading } = useQuery({
    queryKey: [
      'products',
      filterCate,
      filterRating,
      price,
      sortBy,
      page,
      searchValue
    ],
    queryFn: () =>
      getProducts({
        filterCate,
        filterRating,
        price,
        sortBy,
        page,
        searchValue
      })
  });

  // Pagination
  const pageCount = Math.ceil(count / PAGE_SIZE);
  // Pre-fetching
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        'products',
        filterCate,
        filterRating,
        price,
        sortBy,
        page + 1,
        searchValue
      ],
      queryFn: () =>
        getProducts({
          filterCate,
          filterRating,
          price,
          sortBy,
          page: page + 1,
          searchValue
        })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        'products',
        filterCate,
        filterRating,
        price,
        sortBy,
        page - 1,
        searchValue
      ],
      queryFn: () =>
        getProducts({
          filterCate,
          filterRating,
          price,
          sortBy,
          page: page - 1,
          searchValue
        })
    });
  }

  return { products, isLoading, pageCount };
}
