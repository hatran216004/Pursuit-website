import styles from './ReviewCard.module.scss';
import classNames from 'classnames/bind';
import star from '../../assets/img/star.svg';

const cx = classNames.bind(styles);

function ReviewCardItem() {
  return (
    <div className="col">
      <div className={cx('reviewCard-item')}>
        <img
          className={cx('reviewCard-img')}
          src="https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
          alt=""
        />
        <div className={cx('reviewCard-name')}>Sarah Taylor</div>
        <div className={cx('reviewCard-rating')}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <img src={star} alt="" key={index} />
            ))}
        </div>
        <p className={cx('reviewCard-text')}>
          “Really a beautiful sweater for women. I am really lucky that I could
          buy this sweater very easily”
        </p>
      </div>
    </div>
  );
}

export default ReviewCardItem;
