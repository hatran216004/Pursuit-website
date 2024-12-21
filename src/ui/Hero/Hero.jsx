import styles from './Hero.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';

const cx = classNames.bind(styles);

function Hero() {
  return (
    <div className={cx('hero')}>
      <div className="container">
        <div className={cx('hero-inner')}>
          <div className="row items-center">
            <div className="col-5">
              <div className={cx('hero-left')}>
                <h1 className={cx('heading')}>
                  Find the best styles of modern shoes
                </h1>
                <p className={cx('text')}>
                  The most wanted styles is waiting for you. Find the best
                  styles of modern shoes for you .
                </p>
                <Button variation="primary" size="large">
                  Explore Product
                </Button>
              </div>
            </div>
            <div className="col-5 offset-2">
              <div className={cx('hero-right')}>
                <img src="hero.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
