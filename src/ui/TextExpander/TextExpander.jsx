import { useState } from 'react';
import styles from './TextExpander.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 20).join(' ') + '...';
  return (
    <p>
      {displayText}{' '}
      <span
        onClick={() => setIsExpanded(!isExpanded)}
        className={cx('expanded')}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </span>
    </p>
  );
}

export default TextExpander;
