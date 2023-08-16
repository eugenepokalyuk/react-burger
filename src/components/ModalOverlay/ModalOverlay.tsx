import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

import { ModalOverlayProps } from '../../services/types';

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  return <div className={styles.overlay} onClick={handleOverlayClick}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
