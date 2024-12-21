import styles from './ProductList.module.scss';
import classNames from 'classnames/bind';

import { useProducts } from './useProducts';
import Spinner from '../../ui/Spinner';
import Product from './Product';
import Pagination from '../../ui/Pagination';
// import Uploader from '../../ui/Uploader';

const cx = classNames.bind(styles);

function ProductList() {
  const { products, isLoading, pageCount } = useProducts();

  return (
    <div className={cx('wrapper')}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {products?.length > 0 ? (
            <>
              <div className="row row-cols-4 gy-2">
                {products.map((product) => (
                  <div className="col" key={product.id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination pageCount={pageCount} />
            </>
          ) : (
            <p className={cx('no-products')}>Sorry, no products found</p>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
