import { useState } from 'react';
import styles from './Tooltip.module.scss';
import classNames from 'classnames/bind';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  // useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal
} from '@floating-ui/react';

const cx = classNames.bind(styles);

function Tooltip({ children, render, placement = 'bottom' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift()
    ]
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  // const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        {render}
      </button>
      <FloatingPortal>
        {isOpen && (
          <div
            className={cx('tooltip')}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {children}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}

export default Tooltip;
