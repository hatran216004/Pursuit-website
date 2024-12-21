import styles from './Button.module.scss';
import clsx from 'clsx';

function Button({
  children,
  variation = 'primary',
  size = 'large',
  icon,
  secondary,
  disabled = false,
  className = '',
  onClick,
  ...passProps
}) {
  const props = { onClick, ...passProps };

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function')
        delete props[key];
    });
  }

  return (
    <button
      disabled={disabled}
      className={clsx(styles.btn, className, {
        [styles.disabled]: disabled,
        [styles.secondary]: secondary,
        [styles['btn-large']]: size === 'large',
        [styles['btn-medium']]: size === 'medium',
        [styles['btn-small']]: size === 'small',
        [styles['btn-primary']]: variation === 'primary',
        [styles['btn-outline']]: variation === 'outline',
        [styles['btn-rounded']]: variation === 'rounded',
        [styles['btn-roundFull']]: variation === 'rounded-full'
      })}
      onClick={onClick}
    >
      {children}
      {icon && icon}
    </button>
  );
}

export default Button;
