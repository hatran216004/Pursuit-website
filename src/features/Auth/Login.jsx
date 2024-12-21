import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { FaArrowLeft, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../../ui/Input';
import useLogin from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import { schema } from '../../utils/rules';

const cx = classNames.bind(styles);

const loginSchema = schema.pick(['email', 'password']);

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'hatran@example.com',
      password: 'test1234'
    }
  });
  const navigate = useNavigate();
  const { login, isLogging } = useLogin();

  function onSubmit(data) {
    const { email, password } = data;
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => reset()
      }
    );
  }

  return (
    <div className={cx('form-container')}>
      <div className={cx('form-media')}>
        <img src="form-login.jpg" alt="" />
      </div>
      <div className={cx('form-auth-wrapper')}>
        <div className={cx('form-auth-inner')}>
          <h2 className={cx('form-title')}>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              error={errors?.email?.message}
              register={register}
              placeholder="Your email"
              type="email"
              label="Email"
              name="email"
              icon={<MdOutlineEmail className={cx('form-icon')} color="#888" />}
            />
            <Input
              error={errors?.password?.message}
              register={register}
              placeholder="Your password"
              type="password"
              label="Password"
              name="password"
            />
            <span className={cx('form-forgotpassword')}>Forgot password?</span>
            <button
              className={cx('form-submit')}
              disabled={isLogging}
              type="submit"
            >
              {isLogging ? <SpinnerMini /> : 'Login'}
            </button>
          </form>
          <span className={cx('form-signup-order')}>Or Sign In Using</span>
          <div className={cx('form-socials')}>
            <div className={cx('form-socials-item')}>
              <FaFacebookF color="#fff" />
            </div>
            <div className={cx('form-socials-item')}>
              <FaTwitter color="#fff" />
            </div>
            <div className={cx('form-socials-item')}>
              <FaGoogle color="#fff" />
            </div>
          </div>
          <span className={cx('form-signup-order')}>
            Have not account yet ?
          </span>
          <Link to="/signup" className={cx('form-bottom')}>
            sign up
          </Link>
          <div className={cx('form-actions')}>
            <div className={cx('form-back')} onClick={() => navigate('/')}>
              <FaArrowLeft className={cx('form-back-icon')} />
              Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
