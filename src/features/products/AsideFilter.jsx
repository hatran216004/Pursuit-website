import styles from './AsideFilter.module.scss';
import classNames from 'classnames/bind';
import Filter from '../../ui/Filter';

const cx = classNames.bind(styles);

function AsideFilter() {
  return (
    <div className={cx('wrapper')}>
      <Filter filterField="category">
        <Filter.Reset />
        <Filter.FilterBox>
          <Filter.Heading>Catagories</Filter.Heading>
          <Filter.ContentFilter
            options={[
              {
                value: 'all',
                label: 'All'
              },
              {
                value: '1',
                label: 'Man Cloths'
              },
              {
                value: '2',
                label: 'Woman Cloths'
              },
              {
                value: '3',
                label: 'Electronics'
              }
            ]}
          />
        </Filter.FilterBox>
      </Filter>
      <Filter filterField="ratingAverage">
        <Filter.FilterBox>
          <Filter.Heading>Rating</Filter.Heading>
          <Filter.ContentFilter
            options={[
              {
                value: '5',
                label: '5 ⭐ only'
              },
              {
                value: '4',
                label: '4 ⭐ and above'
              },
              {
                value: '3',
                label: '3 ⭐ and above'
              },
              {
                value: '2',
                label: '2 ⭐ and above'
              },
              {
                value: '1',
                label: '1 ⭐ and above'
              }
            ]}
          />
        </Filter.FilterBox>
      </Filter>
      <Filter filterField="price">
        <Filter.FilterBox>
          <Filter.Heading>Filter by price</Filter.Heading>
          <Filter.Price />
        </Filter.FilterBox>
      </Filter>
    </div>
  );
}

export default AsideFilter;
