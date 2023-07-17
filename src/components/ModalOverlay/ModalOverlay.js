import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ onClose }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  return <div className={styles.overlay} onClick={handleOverlayClick}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;