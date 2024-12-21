import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import logo from '../../assets/img/logo.svg';

import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('footer-inner')}>
        <div className="container">
          <div className="row row-cols-5">
            <div className="col">
              <div className={cx('item')}>
                <h4 className={cx('title')}>Customer Service</h4>
                <ul className={cx('list')}>
                  <li>Contact Us</li>
                  <li>FAQs</li>
                  <li>Order Lookup</li>
                  <li>Returns</li>
                  <li>Shipping & Delivery</li>
                  <li>Corporate Gifting</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className={cx('item')}>
                <h4 className={cx('title')}>About Us</h4>
                <ul className={cx('list')}>
                  <li>Careers</li>
                  <li>News & Blog</li>
                  <li>Press Center</li>
                  <li>Investors</li>
                  <li>Suppliers</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className={cx('item')}>
                <h4 className={cx('title')}>Credit Card</h4>
                <ul className={cx('list')}>
                  <li>Gift Cards</li>
                  <li>Gift Cards Balance</li>
                  <li>Shop with Points</li>
                  <li>Reload Your Balance</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className={cx('item')}>
                <h4 className={cx('title')}>Sell</h4>
                <ul className={cx('list')}>
                  <li>Start Selling</li>
                  <li>Learn to Sell</li>
                  <li>Affiliates & Partners</li>
                </ul>{' '}
              </div>
            </div>
            <div className="col">
              <div className={cx('item')}>
                <h4 className={cx('title')}>Follow us</h4>
                <div className={cx('socials')}>
                  <div className={cx('socials-item')}>
                    <FaFacebook className={cx('icon')} />
                  </div>
                  <div className={cx('socials-item')}>
                    <FaLinkedin className={cx('icon')} />
                  </div>
                  <div className={cx('socials-item')}>
                    <FaTwitter className={cx('icon')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('bottom')}>
        <div className="container">
          <div className={cx('bottom-inner')}>
            <img src={logo} alt="Pursuit" />
            <p>Copyright © 2022 UIHUT All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
