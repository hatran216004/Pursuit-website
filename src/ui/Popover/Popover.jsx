import { useState } from 'react';
import styles from './Popover.module.scss';
import classNames from 'classnames/bind';
import {
  useFloating,
  autoUpdate,
  offset,
  // flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useHover,
  useInteractions,
  FloatingFocusManager,
  useId,
  safePolygon
} from '@floating-ui/react';

const cx = classNames.bind(styles);

function Popover({ children, render }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      // flip({ fallbackAxisSideDirection: 'end' }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  const hover = useHover(context, {
    move: false,
    handleClose: safePolygon({
      requireIntent: false
    })
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    // click,
    hover,
    dismiss,
    role
  ]);

  const headingId = useId();

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        {render}
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className={cx('popover')}
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default Popover;
