import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Hero from '../../ui/Hero';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import ProductList from '../../features/products/ProductList';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useUrl } from '../../hooks/useUrl';
import { useProducts } from '../../features/products/useProducts';

const cx = classNames.bind(styles);

export default function Home() {
  const { currentValue, handler } = useUrl('page', 1);
  const { pageCount } = useProducts();

  return (
    <div className={cx('container')}>
      <Hero />
      <Container>
        <h3>Find something you love</h3>
        <div className={cx('row')}>
          <div className="col-12">
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
            </div>
            <ProductList />
          </div>
        </div>
      </Container>
    </div>
  );
}
