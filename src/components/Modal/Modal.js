import React, { useEffect, useState } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';

const Modal = ({ children, header, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal} onKeyDown={onKeyDown}>
        <div className={`${styles.modalContent} pt-10 pr-10 pb-15 pl-10 text-center`}>
          <div className={`${header ? styles.modalHeader : `${styles.modalNoHeader} mt-5 mb-5`} d-flex`}>
            {header && <span className='text text_type_main-large'>{header}</span>}
            {onClose &&
              <span className='ml-auto'><CloseIcon type='primary' onClick={onClose} /></span>
            }
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay />
    </>,
    document.getElementById('root')
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;