import styles from './Input.module.scss';
import clsx from 'clsx';

function Input({
  register,
  name,
  icon,
  label,
  type,
  placeholder,
  labelClass = '',
  inputClass = '',
  formInputClass = '',
  error
}) {
  return (
    <div className={clsx(styles['form-group'])}>
      <label className={clsx(styles['form-label'], labelClass)} htmlFor={name}>
        {label}
      </label>
      <div className={clsx(styles['form-text-input'], formInputClass)}>
        <input
          id={name}
          type={type}
          className={clsx(styles['form-input'], inputClass)}
          placeholder={placeholder}
          {...register(name)}
        />
        {icon && icon}
      </div>
      {error && <p className={clsx(styles['error-message'])}>{error}</p>}
    </div>
  );
}

export default Input;
