import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import { VscLayoutMenubar } from 'react-icons/vsc';
import { IoIosCamera } from 'react-icons/io';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useLogout } from '../../features/Auth/useLogout';
import { useUser } from '../../features/Auth/useUser';
import default_user from '../../assets/img/default-user.png';
import Modal from '../../ui/Modal';
import UserUpdateAvatar from '../../features/User/UserUpdateAvatar';

const cx = classNames.bind(styles);

function Profile() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { pathname } = useLocation();
  const { user } = useUser();

  return (
    <Modal>
      <div className="container">
        <div className={cx('profile-container')}>
          <div className="row">
            <div className="col col-3">
              <div className={cx('profile-sidebar')}>
                <div className={cx('profile-picture')}>
                  <Modal.Open opens="avatar">
                    <div className={cx('profile-picture__thumb')}>
                      <img
                        src={
                          user?.user_metadata?.avatar
                            ? user.user_metadata.avatar
                            : default_user
                        }
                        alt="Profile"
                      />
                      <div className={cx('profile-picture__icon')}>
                        <IoIosCamera size={28} color="#fff" />
                      </div>
                    </div>
                  </Modal.Open>
                  <Modal.Window name="avatar">
                    <UserUpdateAvatar />
                  </Modal.Window>
                </div>
                <ul>
                  <li>
                    <button
                      onClick={() => navigate('/profile')}
                      className={cx('', {
                        active: pathname === '/profile'
                      })}
                    >
                      <FaRegCircleUser
                        className={cx('profile-sidebar__icon')}
                      />
                      Info
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('/profile/settings')}
                      className={cx('', {
                        active: pathname === '/profile/settings'
                      })}
                    >
                      <IoSettingsOutline
                        className={cx('profile-sidebar__icon')}
                      />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/myorders')}>
                      <VscLayoutMenubar
                        className={cx('profile-sidebar__icon')}
                      />
                      My orders
                    </button>
                  </li>
                  <li>
                    <button onClick={logout}>
                      <IoLogOutOutline size={28} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-9">
              <div className={cx('profile-main')}>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default Profile;
