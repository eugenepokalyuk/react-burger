import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyles from './Modal.module.css';
import ReactDOM from 'react-dom';

// С модалками проблема с паддингами, чет не понимаю как реализвать правильно
const Modal = ({ isOpen, onClose, children, header }) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={ModalStyles.modalOverlay}>
            <div className={ModalStyles.modal}>
                <div className={ModalStyles.modalContent}>
                    <div className={`${ModalStyles.modalHeader} ${ModalStyles.modalCloseButton}`}>
                        {header !== '' ? <h2 className={`text text_type_main-large mb-8`}>{header}</h2> : <></>}
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                    <div className={ModalStyles.modalBody}>
                        {children}
                    </div>
                    <div className={ModalStyles.modalFooter}></div>
                </div>
            </div>
        </div>,
        document.getElementById('root')
    );
};

export default Modal;