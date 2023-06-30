import React from 'react'
import PropTypes from 'prop-types'
import ModalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({ onClose }) => {
    return (<div className={ModalOverlayStyles.overlay}></div>)
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay