import styles from './User.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/rules';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useUpdateUser from '../Auth/useUpdateUser';
import SpinnerMini from '../../ui/SpinnerMini';

const cx = classNames.bind(styles);
const passwordSchema = schema.pick(['password', 'confirm_password']);

function UserUpdateFormPassword({ onCloseModal }) {
  const { updateUser, isLoading } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(passwordSchema)
  });

  function onSubmit(data) {
    const { password } = data;
    updateUser(
      { password },
      {
        onSuccess: () => {
          onCloseModal?.();
        }
      }
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('update-content')}>
      <Input
        register={register}
        label="New password"
        error={errors?.password?.message}
        type="password"
        placeholder="Enter new password"
        name="password"
        formInputClass={cx('form-text__input')}
      />
      <Input
        register={register}
        label="Confim new password"
        error={errors?.confirm_password?.message}
        type="password"
        placeholder="Enter confirm password"
        name="confirm_password"
        formInputClass={cx('form-text__input')}
      />

      <div className={cx('update-actions')}>
        <Button
          size="small"
          variation="outline"
          className={cx('update-btn__submit')}
          onClick={onCloseModal}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          size="small"
          className={cx('update-btn__submit')}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : 'Update'}
        </Button>
      </div>
    </form>
  );
}

export default UserUpdateFormPassword;
