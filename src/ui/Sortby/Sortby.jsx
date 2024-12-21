import styles from './Sortby.module.scss';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { useUrl } from '../../hooks/useUrl';

const cx = classNames.bind(styles);

export const selectStyles = {
  control: (styles) => ({
    ...styles,
    height: '46px',
    minWidth: '260px',
    lineHeight: '1.5'
  })
};

function Sortby({ options }) {
  const { handler } = useUrl('sortBy', options[0].value);

  return (
    <div className={cx('wrapper')}>
      <span>Sortby:</span>
      <Select
        styles={selectStyles}
        classNames={cx('select')}
        onChange={(option) => handler(option.value)}
        options={options.map((option) => ({
          value: option.value,
          label: option.label
        }))}
      />
    </div>
  );
}

export default Sortby;
