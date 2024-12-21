import { useEffect, useState } from 'react';
import styles from './User.module.scss';
import classNames from 'classnames/bind';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { updateCurrentUserAvatar } from '../../services/apiAuth';
import { useUser } from '../Auth/useUser';
import default_user from '../../assets/img/default-user.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

const cx = classNames.bind(styles);

function UserUpdateAvatar({ onCloseModal }) {
  const { user } = useUser();
  const [avatar, setAvatar] = useState();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateCurrentUserAvatar
  });

  useEffect(() => {
    return () => avatar && URL.revokeObjectURL(avatar.preview);
  }, [avatar]);

  function handlPreviewImage(e) {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  }

  async function handleUpdateAvatar() {
    mutate(
      { avatar, userId: user.id },
      {
        onSuccess: (data) => {
          onCloseModal?.();
          queryClient.setQueryData(['user'], data.user);
          toast.success('Update successfully');
        }
      }
    );
  }

  return (
    <div className={cx('upload-image__wrapper')}>
      <div className={cx('upload-image__thumb')}>
        {!avatar ? (
          <img
            src={
              user?.user_metadata?.avatar
                ? user?.user_metadata?.avatar
                : default_user
            }
            alt={user?.user_metadata?.username}
          />
        ) : (
          <img src={avatar.preview} alt={user?.user_metadata?.username} />
        )}
      </div>
      <label htmlFor="file" className={cx('upload-image__btn')}>
        Upload image
        <MdOutlineDriveFolderUpload size={24} />
      </label>
      <input type="file" id="file" hidden onChange={handlPreviewImage} />
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
          onClick={handleUpdateAvatar}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : 'Update'}
        </Button>
      </div>
    </div>
  );
}

export default UserUpdateAvatar;
