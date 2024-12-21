import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight
} from 'react-icons/md';
import { useUrl } from '../../hooks/useUrl';
import { RANGE } from '../../utils/constant';

const cx = classNames.bind(styles);

/*
    TH1: currentPage thuộc 1 - 5
    Các số trang lớn hơn currentPage + RANGE và nhỏ hơn (pageCount - RANGE + 1) cần ẩn bằng dấu ba chấm
    vd: với pageCount = 20 và RANGE = 2, currentPage = 3 thì ẩn các 5 < trang < 19

    TH2: currentPage nằm ở giữa (không phải các trang đầu hoặc cuối) (5 < currentPage < 16)
    Ẩn các trang:
    Trước: Các trang từ (RANGE + 1) đến (currentPage - RANGE)
        vd: currentPage = 10 thì ẩn các trang từ 3 đến 8
    Sau: Các trang từ (currentPage + RANGE) đến (pageCount - RANGE)
    Thay thế các nhóm trang ẩn bằng dấu ba chấm

    TH3: currentPage nằm gần các trang cuối (từ (pageCount - RANGE * 2) trở đi (currentPage >= 16)
    Ẩn các trang trước (currentPage - RANGE) và sau (RANGE)
    Hiển thị các trang đầu, dấu ba chấm, và các trang gần cuối
*/

function Pagination({ pageCount }) {
  const { currentValue, handler } = useUrl('page', 1);
  const currentPage = Number(currentValue);

  function renderPagination() {
    // Cờ kiểm soát việc hiển thị dấu ba chấm trước (...) hoặc sau (...) các trang số
    let dotAfter = false;
    let dotBefore = false;

    function renderDotBefor(index) {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <button key={index} className={cx('pagination-item')}>
            ...
          </button>
        );
      }
      return null;
    }

    function renderDotAfter(index) {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <button key={index} className={cx('pagination-item')}>
            ...
          </button>
        );
      }
      return null;
    }

    return Array(pageCount)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        // TH1
        if (
          currentPage <= RANGE * 2 + 1 &&
          pageNumber > currentPage + RANGE &&
          pageNumber < pageCount - RANGE + 1
        ) {
          return renderDotAfter(index);
        }
        // TH2
        else if (
          currentPage > RANGE * 2 + 1 &&
          currentPage < pageCount - RANGE * 2
        ) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE)
            return renderDotBefor(index);
          if (
            pageNumber > currentPage + RANGE &&
            pageNumber < pageCount - RANGE + 1
          )
            return renderDotAfter(index);
        }
        // TH3
        else if (
          currentPage >= pageCount - RANGE * 2 &&
          pageNumber < currentPage - RANGE &&
          pageNumber > RANGE
        )
          return renderDotBefor(index);

        return (
          <button
            key={index}
            className={cx('pagination-item', {
              active: pageNumber === currentPage,
              disabled: pageNumber === currentPage
            })}
            onClick={() => handler(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      });
  }

  function handleChangePage(type) {
    if (type === 'next') {
      if (currentPage >= pageCount) return;
      handler(currentPage + 1);
    }

    if (type === 'prev') {
      if (currentPage <= 1) return;
      handler(currentPage - 1);
    }
  }

  return (
    <div className={cx('pagination-wrapper')}>
      <div className={cx('pagination')}>
        <button
          className={cx('pagination-item', {
            disabled: currentPage <= 1
          })}
          onClick={() => handleChangePage('prev')}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        {renderPagination()}
        <button
          className={cx('pagination-item', {
            disabled: currentPage >= pageCount
          })}
          onClick={() => handleChangePage('next')}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
