import styles from './User.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/rules';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useUpdateUser from '../Auth/useUpdateUser';
import SpinnerMini from '../../ui/SpinnerMini';
import { useUser } from '../Auth/useUser';

const cx = classNames.bind(styles);
const profileSchema = schema.pick(['username', 'address']);

function UserUpdateForm({ onCloseModal }) {
  const { user: { user_metadata: { username, address } = {} } = {} } =
    useUser();
  const { updateUser, isLoading } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username,
      address
    }
  });

  function onSubmit(data) {
    const { username, address } = data;
    updateUser(
      { username, address },
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
        label="Username"
        error={errors?.username?.message}
        type="text"
        placeholder="Enter your fullname"
        name="username"
        formInputClass={cx('form-text__input')}
      />
      <Input
        register={register}
        label="Address"
        error={errors?.address?.message}
        type="text"
        placeholder="Enter your address"
        name="address"
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

export default UserUpdateForm;
