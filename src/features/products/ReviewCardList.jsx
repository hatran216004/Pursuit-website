import styles from './ReviewCard.module.scss';
import classNames from 'classnames/bind';
import ReviewCardItem from './ReviewCardItem';

const cx = classNames.bind(styles);

function ReviewCardList() {
  return (
    <div className={cx('wrapper')}>
      <div className="row row-col-4">
        <ReviewCardItem />
        <ReviewCardItem />
        <ReviewCardItem />
        <ReviewCardItem />
      </div>
    </div>
  );
}

export default ReviewCardList;
