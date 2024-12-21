import { useNavigate } from 'react-router-dom';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';

import Button from '../../ui/Button';
import star from '../../assets/img/star.svg';
import { formatCurrency } from '../../utils/helper';

const cx = classNames.bind(styles);

function Product({ product }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    regularPrice,
    discountPrice,
    stock,
    ratingAverage,
    image,
    category
  } = product;

  let price = regularPrice;
  const categoryName = category.name
    .split('-')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');

  if (discountPrice && discountPrice < regularPrice)
    price = regularPrice - discountPrice;

  function handleClick() {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className={cx('product')}>
      <div className={cx('img-wrapper')} onClick={handleClick}>
        <img src={image} alt="" className={cx('img')} />
        {!stock && (
          <div className={cx('outOfStock')}>
            <span>OUT OF STOCK</span>
          </div>
        )}
      </div>
      <div className={cx('info')}>
        <div className={cx('info-heading')}>
          <span className={cx('category')}>{categoryName}</span>
        </div>
        <h2 className={cx('name')} onClick={handleClick}>
          {name}
        </h2>
        <div className={cx('info-bottom')}>
          <div className={cx('rating')}>
            <img src={star} alt="star" />
            <span>{ratingAverage} (18)</span>
          </div>
          <div
            className={cx('price', {
              'have-discount': discountPrice
            })}
          >
            {discountPrice !== 0 && (
              <span>{formatCurrency(regularPrice)}đ</span>
            )}
            <span>{formatCurrency(price)}đ</span>
          </div>
        </div>
        <div className={cx('btn-submit')}>
          <Button
            variation="outline"
            size="large"
            className="w-full"
            onClick={handleClick}
          >
            See detail
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
