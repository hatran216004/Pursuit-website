import styles from '../../pages/Profile/Profile.module.scss';
import classNames from 'classnames/bind';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import UserUpdateFormPassword from './UserUpdateFormPassword';

const cx = classNames.bind(styles);

function Settings() {
  return (
    <>
      <div className={cx('profile-header')}>
        <h1 className={cx('profile-title')}>User settings</h1>
      </div>
      <div className={cx('profile-content')}>
        <div className={cx('profile-row')}>
          <p className={cx('profile-label')}>Password</p>
          <p className={cx('profile-data')}>********</p>
        </div>
      </div>
      <Modal.Open opens="update-form">
        <Button className="mt-auto">Update password</Button>
      </Modal.Open>

      <Modal.Window name="update-form">
        <UserUpdateFormPassword />
      </Modal.Window>
    </>
  );
}

export default Settings;
