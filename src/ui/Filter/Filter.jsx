import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import { createContext, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/rules';

const cx = classNames.bind(styles);
const priceSchema = schema.pick(['price_min', 'price_max']);
const FilterContext = createContext();

function Filter({ children, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(priceSchema),
    defaultValues: {
      from: searchParams.get('price_min') ?? '',
      to: searchParams.get('price_max') ?? ''
    }
  });

  const currentField = searchParams.get(filterField) ?? 'all';

  function handler(value) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterField, value);
    if (newParams.get('page')) newParams.set('page', 1);
    setSearchParams(newParams);
  }

  function resetFilter() {
    searchParams.delete('sortBy');
    searchParams.delete('category');
    searchParams.delete('ratingAverage');
    searchParams.delete('price_min');
    searchParams.delete('price_max');
    setSearchParams(searchParams);
    reset();
  }

  return (
    <FilterContext.Provider
      value={{
        currentField,
        errors,
        searchParams,
        setSearchParams,
        register,
        getValues,
        handler,
        handleSubmit,
        resetFilter
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

function FilterBox({ children }) {
  return <div className={cx('wrapper')}>{children}</div>;
}

function Heading({ children }) {
  return <h4 className={cx('heading')}>{children}</h4>;
}

function ContentFilter({ options }) {
  const { currentField, handler } = useContext(FilterContext);

  return (
    <div className={cx('filter-wrapper')}>
      {options.map((option) => (
        <button
          key={option.value}
          className={cx('filter-item', {
            active: currentField === option.value
          })}
          onClick={() => handler(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Price() {
  const { register, errors, searchParams, setSearchParams, handleSubmit } =
    useContext(FilterContext);

  function onSubmit(formData) {
    const { price_min, price_max } = formData;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('price_min', price_min);
    newParams.set('price_max', price_max);
    setSearchParams(newParams);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
      <div className={cx('form-group')}>
        <label>From:</label>
        <input
          type="number"
          {...register('price_min')}
          className={cx('form-input')}
        />
        {errors && (
          <span className={cx('error-message')}>
            {errors?.price_min?.message}
          </span>
        )}
      </div>
      <div className={cx('form-group')}>
        <label>To:</label>
        <input
          type="number"
          {...register('price_max')}
          className={cx('form-input')}
        />
        {errors && (
          <span className={cx('error-message')}>
            {errors?.price_max?.message}
          </span>
        )}
      </div>
      <button className={cx('btn-submit')}>Filter</button>
    </form>
  );
}

function Reset() {
  const { resetFilter } = useContext(FilterContext);
  return (
    <button className={cx('btn-reset')} onClick={resetFilter}>
      Reset filter
    </button>
  );
}

Filter.FilterBox = FilterBox;
Filter.Heading = Heading;
Filter.ContentFilter = ContentFilter;
Filter.Price = Price;
Filter.Reset = Reset;

export default Filter;
