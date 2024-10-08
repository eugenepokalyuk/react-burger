import React, {FC, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useMediaQuery} from 'react-responsive';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {ModalProps} from '../../services/types/types'

const Modal:FC<ModalProps> = ({ children, header, onClose }) => {
    const onCloseCallback = useCallback(onClose, [onClose]);

    const isDesktop = useMediaQuery({ minWidth: 961 });

    const isTablet = useMediaQuery({ minWidth: 376, maxWidth: 960 });

    const isMobile = useMediaQuery({ maxWidth: 375 });

    const onKeyDown:React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            onCloseCallback();
        }
    };

    useEffect(() => {
        const handleKeyDown:EventListener = (event:Event) => {
            const keyboardEvent = event as KeyboardEvent;

            if (keyboardEvent.key === 'Escape') {
                onCloseCallback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCloseCallback]);

    return ReactDOM.createPortal(
        <>
            {isDesktop && (
                <>
                    <div className={styles.modal} data-cy="modalContainer">
                        <div className={`${styles.modalContent} pt-10 pr-10 pb-15 pl-10 text-center`}
                             onKeyDown={onKeyDown}>
                            <div
                                className={`${header ? styles.modalHeader : `${styles.modalNoHeader} mt-5 mb-5`} d-flex`}>
                                {header && <span className='text text_type_main-large'>{header}</span>}
                                {onClose && (
                                    <span className={`${styles.closeIcon} ml-auto`} data-cy="modalCloseIcon"> <CloseIcon
                                        type='primary' onClick={onClose}/>
                                    </span>
                                )}
                            </div>

                            {children}
                        </div>
                    </div>
                    <ModalOverlay onClose={onClose}/>
                </>
            )}
            {isMobile || isTablet && (
                <>
                    <div className={styles.modal} data-cy="modalContainer">
                        <div className={`${styles.modalContent} pt-10 pr-10 pb-15 pl-10 text-center`}
                             onKeyDown={onKeyDown}>
                            <div
                                className={`${header ? styles.modalHeader : `${styles.modalNoHeader} mt-5 mb-5`} d-flex`}>
                                {header && <span className='text text_type_main-medium'>{header}</span>}
                                {onClose && (
                                    <span className={`${styles.closeIcon} ml-auto`} data-cy="modalCloseIcon"><CloseIcon
                                        type='primary' onClick={onClose}/>
                                    </span>
                                )}
                            </div>

                            {children}
                        </div>
                    </div>
                    <ModalOverlay onClose={onClose}/>
                </>
            )}
        </>,
        document.getElementById('root') as HTMLElement
    );
};

export default Modal;
