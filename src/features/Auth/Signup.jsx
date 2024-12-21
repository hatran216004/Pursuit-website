import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { FaArrowLeft, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSignup } from './useSignup';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import { schema } from '../../utils/rules';

const cx = classNames.bind(styles);
const signupSchema = schema.pick(['email', 'password', 'confirm_password']);

function Signup() {
  const navigate = useNavigate();
  const { singup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  function onSubmit(formData) {
    const dataSignup = { email: formData.email, password: formData.password };
    singup(dataSignup);
    reset();
  }

  return (
    <div className={cx('form-container')}>
      <div className={cx('form-media')}>
        <img src="form-signup.jpg" alt="" />
      </div>
      <div className={cx('form-auth-wrapper')}>
        <div className={cx('form-auth-inner')}>
          <h2 className={cx('form-title')}>Sign up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Input
              error={errors?.confirm_password?.message}
              register={register}
              placeholder="Your confirm password"
              type="password"
              label="Confirm password"
              name="confirm_password"
            />
            <span className={cx('form-forgotpassword')}>Forgot password?</span>
            <button className={cx('form-submit')} disabled={isLoading}>
              {!isLoading ? 'Sign up' : <SpinnerMini />}
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
          <span className={cx('form-signup-order')}>Have an account ?</span>
          <Link to="/login" className={cx('form-bottom')}>
            login
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

export default Signup;
