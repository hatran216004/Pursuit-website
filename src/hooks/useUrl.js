import { useSearchParams } from 'react-router-dom';

export function useUrl(field, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(field) ?? defaultValue;

  function handler(value) {
    const newParams = new URLSearchParams(searchParams);
    if (searchParams.get('page')) searchParams.set('page', 1);
    newParams.set(field, value);
    setSearchParams(newParams);
  }

  return { currentValue, handler };
}
