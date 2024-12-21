import { useState } from 'react';
import styles from './CartItem.module.scss';
import classNames from 'classnames/bind';

import { useUpdateCartItem } from './useUpdateCartItem';
import { formatCurrency } from '../../utils/helper';
import InputNumber from '../../ui/InputNumber';
import Modal from '../../ui/Modal';
import DeleteModalContent from './DeleteModalContent';

const cx = classNames.bind(styles);

function CartItem({ item, index }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const { updateCartItem, isUpdating } = useUpdateCartItem();

  function handleChange(value) {
    console.log(value);
    if (value > item.productId.stock) setQuantity(item.productId.stock);
    else setQuantity(Number(value));
  }

  function handleDec() {
    if (quantity - 1 <= 0) return;
    else {
      setQuantity((prev) => prev - 1);
      updateCartItem({ cartId: item.id, quantity: quantity - 1 });
    }
  }

  function handleInc() {
    if (quantity + 1 > item.productId.stock) return;
    else {
      setQuantity((prev) => prev + 1);
      updateCartItem({ cartId: item.id, quantity: quantity + 1 });
    }
  }

  return (
    <Modal>
      <div className={cx('cart-item')}>
        <div className={cx('cart-item-header')}>
          <span>Item {index + 1}</span>
          <Modal.Open opens="delete">
            <button className={cx('cart-item-remove')}>Remove</button>
          </Modal.Open>

          <Modal.Window name="delete">
            <DeleteModalContent id={item.id} />
          </Modal.Window>

          <div className={cx('cart-item-qty')}>
            <span>Quantity:</span>
            <div>
              <button disabled={isUpdating} onClick={handleDec}>
                -
              </button>
              <InputNumber
                className={cx('input-custom')}
                value={quantity}
                onChange={handleChange}
                onBlur={() => updateCartItem({ cartId: item.id, quantity })}
              />
              <button disabled={isUpdating} onClick={handleInc}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className={cx('cart-item-info')}>
          <img
            className={cx('cart-item-img')}
            src={item.productId.image}
            alt=""
          />
          <div>
            <h1 className={cx('cart-item-name')}>{item.productId.name}</h1>
            <span className={cx('cart-item-id')}>Cart ID: {item.id}</span>
            <div className={cx('cart-item-price')}>
              <span
                className={cx('', {
                  'have-discount': item.productId.discountPrice !== 0
                })}
              >
                {formatCurrency(item.productId.regularPrice)}đ
              </span>
              {item.productId.discountPrice !== 0 && (
                <span>
                  {formatCurrency(
                    item.productId.regularPrice - item.productId.discountPrice
                  )}
                  đ
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CartItem;
