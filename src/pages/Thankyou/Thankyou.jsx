import styles from './Thankyou.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useUpdatePayment } from '../../features/payment/useUpdatePayment';
import { useUpdateOrder } from '../../features/order/useUpdateOrder';
import thankyou_image from '../../assets/img/thankyou.jpg';
import { FaArrowRight } from 'react-icons/fa';
import { useDeleteCart } from '../../features/cart/useDeleteCart';
import { useUser } from '../../features/Auth/useUser';
import { updateStockAfterOrder } from '../../services/apiProduct';

const cx = classNames.bind(styles);
function Thankyou() {
  const [searchParams] = useSearchParams();
  const { updatePayment } = useUpdatePayment();
  const { updateOrder } = useUpdateOrder();
  const { deleteCart } = useDeleteCart();
  const { user } = useUser();

  const paymentLinkId = searchParams.get('id');
  const orderId = searchParams.get('orderId');
  const code = searchParams.get('code');
  const status = searchParams.get('status');

  useEffect(() => {
    if (code === '00' && status === 'PAID' && user) {
      updatePayment({ orderId, paymentLinkId, status: 'paid' });
      updateOrder(
        { orderId, status: 'paid' },
        {
          onSettled: async () => {
            await updateStockAfterOrder(user.id);
            deleteCart(user.id);
          }
        }
      );
    }
  }, [
    paymentLinkId,
    orderId,
    user,
    code,
    status,
    updatePayment,
    updateOrder,
    deleteCart
  ]);

  return (
    <div className="container">
      <div className={cx('thankyou')}>
        <p>Thank you</p>
        <img src={thankyou_image} alt="Thank you" />
        <Link to="/products">
          Continute shopping <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default Thankyou;
