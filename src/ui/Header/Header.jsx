import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { RiShoppingCartLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import { VscLayoutMenubar } from 'react-icons/vsc';

import { useCart } from '../../features/cart/useCart';
import { useAppContext } from '../../context/AppContext';
import { useLogout } from '../../features/Auth/useLogout';
import { useUser } from '../../features/Auth/useUser';
import { cutStringUntil, debounce } from '../../utils/helper';
import Tooltip from '../../ui/Tooltip';
import Popover from '../Popover';
import logo from '../../assets/img/logo.svg';
import default_user from '../../assets/img/default-user.png';

const cx = classNames.bind(styles);

function Header() {
  const { logout } = useLogout();
  const { isAuthenticated } = useAppContext();
  const { cart } = useCart();
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const naviagte = useNavigate();

  let name;
  if (user) {
    const sliceName = cutStringUntil('@', user.email);
    name = sliceName.length > 10 ? user.email.slice(0, 10) + '...' : sliceName;
  }

  const handleChange = debounce((e) => {
    // Sao chép các params hiện có
    const newParams = new URLSearchParams(searchParams);
    newParams.set('search', e.target.value.trim());
    naviagte(`/products?${newParams.toString()}`);
  });

  return (
    <header
      className={cx('header', {
        fixed: false
      })}
    >
      <div className={cx('container')}>
        <div className={cx('header-inner')}>
          <Link to="/">
            <img src={logo} alt="Pursuit" />
          </Link>
          <form className={cx('search')}>
            <input
              spellCheck="false"
              type="text"
              className={cx('input')}
              placeholder="Search for anything"
              onChange={handleChange}
            />
            <button className={cx('search-btn')}>
              <CiSearch />
            </button>
          </form>
          {isAuthenticated ? (
            <div className={cx('actions')}>
              <Popover
                render={
                  <div className={cx('actions-item')}>
                    <img
                      className={cx('user-avatar')}
                      src={
                        user?.user_metadata?.avatar
                          ? user.user_metadata.avatar
                          : default_user
                      }
                      alt={name}
                    />
                  </div>
                }
              >
                <div className={cx('menus')}>
                  <div className={cx('menus-item')}>
                    <img
                      src={
                        user?.user_metadata?.avatar
                          ? user.user_metadata.avatar
                          : default_user
                      }
                      alt={name}
                    />
                    <div className={cx('user-names')}>
                      <span>{name}</span>
                      <span>@{name}</span>
                    </div>
                  </div>
                  <button
                    className={cx('menus-item')}
                    onClick={() => naviagte('/profile')}
                  >
                    <CgProfile className={cx('menus-icon')} />
                    My profile
                  </button>
                  <button
                    className={cx('menus-item')}
                    onClick={() => naviagte('/profile/settings')}
                  >
                    <IoSettingsOutline className={cx('menus-icon')} /> Settings
                  </button>
                  <button
                    className={cx('menus-item')}
                    onClick={() => naviagte('/myorders')}
                  >
                    <VscLayoutMenubar className={cx('menus-icon')} /> My orders
                  </button>
                  <button className={cx('menus-item')} onClick={logout}>
                    <IoLogOutOutline className={cx('menus-icon')} /> Logout
                  </button>
                </div>
              </Popover>

              <Tooltip
                render={
                  <NavLink to="/cart">
                    <div className={cx('actions-item')}>
                      <RiShoppingCartLine className={cx('icon')} />(
                      {cart?.length ? cart.length : 0})
                    </div>
                  </NavLink>
                }
              >
                My cart
              </Tooltip>
            </div>
          ) : (
            <div className={cx('btn-wrapper')}>
              <Link to="signup" className={cx('btn-signup')}>
                Sign up
              </Link>
              <Link to="login" className={cx('btn-login')}>
                Login
              </Link>
            </div>
          )}
        </div>
        <aside className={cx('side-nav')}>
          <ul className={cx('side-list')}>
            <li>
              <NavLink className={cx('side-link')} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={cx('side-link')} to="products">
                Products
              </NavLink>
            </li>
            {/* <li>
              <NavLink className={cx('side-link')} to="about">
                About
              </NavLink>
            </li> */}
          </ul>
        </aside>
      </div>
    </header>
  );
}

export default Header;
