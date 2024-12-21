import styles from '../../pages/Profile/Profile.module.scss';
import classNames from 'classnames/bind';
import { useUser } from '../Auth/useUser';
import { cutStringUntil } from '../../utils/helper';
import Modal from '../../ui/Modal';
import UserUpdateForm from './UserUpdateForm';
import Button from '../../ui/Button';

const cx = classNames.bind(styles);

function UserInfo() {
  const {
    user: {
      email,
      user_metadata: { username: currentUserName, address } = {}
    } = {}
  } = useUser();
  let username;
  if (email) username = cutStringUntil('@', email);

  return (
    <>
      <div className={cx('profile-header')}>
        <h1 className={cx('profile-title')}>User Info</h1>
      </div>
      <div className={cx('profile-content')}>
        <div className={cx('profile-row')}>
          <p className={cx('profile-label')}>Email</p>
          <p className={cx('profile-data')}>{email}</p>
        </div>
        <div className={cx('profile-row')}>
          <p className={cx('profile-label')}>Username</p>
          <p className={cx('profile-data')}>
            {currentUserName ? currentUserName : username}
          </p>
        </div>
        <div className={cx('profile-row')}>
          <p className={cx('profile-label')}>Address</p>
          <p className={cx('profile-data')}>
            {address ? address : 'Update your address'}
          </p>
        </div>
      </div>
      <Modal.Open opens="update-form">
        <Button className="mt-auto">Update profile</Button>
      </Modal.Open>

      <Modal.Window name="update-form">
        <UserUpdateForm />
      </Modal.Window>
    </>
  );
}

export default UserInfo;
