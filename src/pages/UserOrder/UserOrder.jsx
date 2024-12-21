import styles from './ProductTable.module.scss';
import classNames from 'classnames/bind';
import useUserOrders from '../../features/order/useUserOrders';
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/helper';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import empty_cart from '../../assets/img/empty-cart.webp';
import Spinner from '../../ui/Spinner';

const cx = classNames.bind(styles);

function UserOrder() {
  const { userOrders: { orders, ordersDetail } = {}, isLoading } =
    useUserOrders();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="loading-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="container">
      {orders.length > 0 ? (
        <div className={cx('prod-table__container')}>
          <h2 className={cx('prod-table__title')}>Your orders</h2>
          <p className={cx('prod-table__text')}>
            {ordersDetail.length} items in your orders list
          </p>
          <div className={cx('prod-table__table')}>
            <div className={cx('prod-table__table-head')}>
              <h4 className={cx('prod-table__heading')}></h4>
              <h4 className={cx('prod-table__heading')}>Product Name</h4>
              <h4 className={cx('prod-table__heading')}>Price</h4>
              <h4 className={cx('prod-table__heading')}>Quantity</h4>
              <h4 className={cx('prod-table__heading')}>Status</h4>
              <h4 className={cx('prod-table__heading')}>Order date</h4>
            </div>
            <div className={cx('prod-table__table-body')}>
              {ordersDetail.map((item) => {
                const status = orders.find(
                  (ele) => ele.id === item.orderId
                ).status;
                return (
                  <div className={cx('table-item')}>
                    <div className={cx('table-item__image')}>
                      <img src={item.image} alt="" />
                    </div>
                    <h2 className={cx('table-item__text')}>{item.name}</h2>
                    <span className={cx('table-item__text')}>
                      {formatCurrency(item.price)}đ
                    </span>
                    <span className={cx('table-item__text')}>
                      {item.quantity}
                    </span>
                    <span className={cx('table-item__text')}>{status}</span>
                    <span className={cx('table-item__text')}>
                      {format(new Date(item.created_at), 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className={cx('prod-table__container')}>
          <div className="empty-wrapper">
            <h4 className="empty-text">You have no orders yet 😟</h4>
            <img src={empty_cart} alt="" className="empty-image" />
            <Button
              variation="rounded-full"
              onClick={() => navigate('/products')}
            >
              RETURN TO THE SHOP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrder;
