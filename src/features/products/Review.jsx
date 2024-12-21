import styles from './Review.module.scss';
import classNames from 'classnames/bind';

import star from '../../assets/img/star.svg';
import RatingStar from '../../ui/RatingStar';
import Button from '../../ui/Button';

const cx = classNames.bind(styles);

export default function Review() {
  return (
    <div className={cx('wrapper')}>
      <div className="row row-cols-2">
        <div className="col">
          <h4 className={cx('review-title')}>Customer Reviews</h4>
          <h5 className={cx('review-subTitle')}>77 Reviews</h5>
          <div className={cx('review-stars')}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <img src={star} alt="" key={index} />
              ))}
          </div>
          <div className={cx('review-group')}>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className={cx('review-detail')} key={index}>
                    <span>{5 - index} Stars</span>
                    <div className={cx('review-progress')}>
                      <div style={{ width: `${5 - index}0%` }}></div>
                    </div>
                    <span>{Math.floor(Math.random() * 100)}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col">
          <h4 className={cx('review-title')}>How would you rate this?</h4>
          <div className={cx('review-stars')}>
            <RatingStar />
          </div>
          <h5 className={cx('review-subTitle')}>Write a review</h5>
          <textarea
            className={cx('review-comment')}
            placeholder="Tell us what do you think"
          ></textarea>
          <Button variation="primary" size="medium">
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
