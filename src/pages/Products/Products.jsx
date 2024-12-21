import styles from '../Home/Home.module.scss';
import classNames from 'classnames/bind';
import Container from '../../ui/Container';
import Sortby from '../../ui/Sortby';
import Button from '../../ui/Button';
import ProductList from '../../features/products/ProductList';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useUrl } from '../../hooks/useUrl';
import { useProducts } from '../../features/products/useProducts';
import AsideFilter from '../../features/products/AsideFilter';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Products() {
  const { currentValue, handler } = useUrl('page', 1);
  const { pageCount } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleGetAllProducts() {
    searchParams.delete('sortBy');
    searchParams.delete('category');
    searchParams.delete('ratingAverage');
    searchParams.delete('price_min');
    searchParams.delete('price_max');
    searchParams.delete('search');
    setSearchParams(searchParams);
  }

  return (
    <div className={cx('container')}>
      <Container>
        <h3 className={cx('productList-heading')}>Product List</h3>
        <p className={cx('productList-desc')}>
          We hear what you need. We plan, design & develop visionary concept
          websites.
        </p>
        <div className={cx('main row')}>
          <div className="col-10">
            <div className={cx('operations')}>
              <div className={cx('pagination')}>
                <Button
                  variation="outline"
                  size="small"
                  className="h-full"
                  onClick={() => handler(Number(currentValue) - 1)}
                  disabled={Number(currentValue) === 1}
                >
                  <FaArrowLeft />
                </Button>
                <Button
                  variation="outline"
                  size="small"
                  className="h-full"
                  onClick={() => handler(Number(currentValue) + 1)}
                  disabled={Number(currentValue) >= pageCount}
                >
                  <FaArrowRight />
                </Button>
              </div>
              <div className={cx('operations-right')}>
                <button onClick={handleGetAllProducts}>All products</button>
                <Sortby
                  options={[
                    {
                      value: 'regularPrice-desc',
                      label: 'Sort by price (high first)'
                    },
                    {
                      value: 'regularPrice-asc',
                      label: 'Sort by price (low first)'
                    },
                    {
                      value: 'created_at-asc',
                      label: 'Sort by date (recent date)'
                    },
                    {
                      value: 'created_at-desc',
                      label: 'Sort by date (earlier date)'
                    }
                  ]}
                />
              </div>
            </div>
            <ProductList />
          </div>
          <div className="col-2">
            <AsideFilter />
          </div>
        </div>
      </Container>
    </div>
  );
}
