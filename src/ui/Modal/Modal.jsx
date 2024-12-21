import { cloneElement, createContext, useContext } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const cx = classNames.bind(styles);

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');

  return (
    <ModalContext.Provider value={{ openName, close, open: setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWindowName)
  });
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className={cx('overlay')}>
      <div className={cx('content')} ref={ref}>
        <button onClick={close} className={cx('btn-close')}>
          <IoClose />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
