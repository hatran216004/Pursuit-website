import { useDeleteCartItem } from './useDeleteCartItem';
import styles from './CartItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DeleteModalContent({ id, onCloseModal }) {
  const { deleteCartItem, isLoading } = useDeleteCartItem();
  function handleDeleteItem() {
    deleteCartItem(id);
    onCloseModal?.();
  }

  return (
    <div className={cx('delete-wrapper')}>
      <p>Are you sure you want to delete this item ?</p>
      <div>
        <button disabled={isLoading} onClick={onCloseModal}>
          Cancle
        </button>
        <button onClick={handleDeleteItem} disabled={isLoading}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DeleteModalContent;
