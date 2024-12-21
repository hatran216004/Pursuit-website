import styles from './InputNumber.module.scss';
import clsx from 'clsx';

function InputNumber({ onChange, onBlur, value, className, placeholder = '' }) {
  function handleChange(e) {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    if (inputValue === '') onChange(1);
    else onChange(numericValue);
  }

  return (
    <input
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={handleChange}
      type="text"
      className={clsx(styles['input-number'], className)}
      value={value}
    />
  );
}

export default InputNumber;
