import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from '../../utils/helper';
import { useCart } from './useCart';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import CartItem from './CartItem';
import empty_cart from '../../assets/img/empty-cart.webp';

const cx = classNames.bind(styles);

export default function Cart() {
  const navigate = useNavigate();
  const { cart, isLoading } = useCart();

  if (isLoading)
    return (
      <div className="loading-screen">
        <Spinner />
      </div>
    );

  const originalPrice = cart.reduce(
    (result, curr) => (result += curr.productId.regularPrice * curr.quantity),
    0
  );

  const savingsPrice = cart.reduce(
    (result, curr) => (result += curr.productId.discountPrice * curr.quantity),
    0
  );

  return (
    <Container>
      <div className={cx('cart-wrapper')}>
        {cart.length > 0 ? (
          <div className="row">
            <div className="col col-6">
              <div>
                <h4 className={cx('cart-heading')}>
                  Shopping cart ({cart.length} items)
                </h4>
                <div className={cx('cart-list')}>
                  {cart.map((item, index) => {
                    return <CartItem item={item} index={index} key={item.id} />;
                  })}
                </div>
              </div>
            </div>
            <div className="col col-5 offset-1">
              <div>
                <h4 className={cx('cart-heading')}>Order Summury</h4>
                <div className={cx('cart-order')}>
                  <div className={cx('cart-order-row')}>
                    <span>Original Price</span>
                    <span>{formatCurrency(originalPrice)}đ</span>
                  </div>
                  <div className={cx('cart-order-row')}>
                    <span>Savings</span>
                    <span>{formatCurrency(savingsPrice)}đ</span>
                  </div>
                  <div className={cx('cart-order-row')}>
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                </div>
                <div className={cx('cart-order-totalPrice')}>
                  <span>Total</span>
                  <span>{formatCurrency(originalPrice - savingsPrice)}đ</span>
                </div>
                <Button
                  className={cx('cart-order-btn')}
                  secondary
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Check Out
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-wrapper">
            <h4 className="empty-text">Your cart is Empty 😟</h4>
            <img src={empty_cart} alt="" className="empty-image" />
            <Button
              variation="rounded-full"
              onClick={() => navigate('/products')}
            >
              RETURN TO THE SHOP
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}
