import styles from './RatingStar.module.scss';
import classNames from 'classnames/bind';
import star from '../../assets/img/star.svg';

const cx = classNames.bind(styles);

function RatingStar() {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <img src={star} alt="" key={index} />
        ))}
    </>
  );
}

export default RatingStar;
