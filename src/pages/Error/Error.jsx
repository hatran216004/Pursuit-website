import { useNavigate } from 'react-router-dom';
import styles from './Error.module.scss';
import classNames from 'classnames/bind';
import Button from '../../ui/Button';

const cx = classNames.bind(styles);

function Error() {
  const navigate = useNavigate();
  return (
    <div className={cx('not-found')}>
      <h1 className={cx('not-found__title')}>404</h1>
      <p className={cx('not-found__message')}>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button onClick={() => navigate('/')}>Go back to Home</Button>
    </div>
  );
}

export default Error;
