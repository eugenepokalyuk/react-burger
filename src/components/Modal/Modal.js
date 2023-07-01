import React, { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, children, header, onClose }) => {
    const onKeyDown = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKeyDown, false);
        }
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [isOpen]);

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
            <ModalOverlay header={header} />
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