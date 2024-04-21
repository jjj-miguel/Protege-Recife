import React from 'react'
import './Modal.css';

const Modal = ({message, onClose}) => {
  return (
    <div className="modal-background">
        <div className="modal-content">
            <p>{message}</p>
            <button className='btn' onClick={onClose}>Fechar</button>
        </div>
    </div>
  );
};

export default Modal;