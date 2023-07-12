// Dependencies Import
import React from 'react';

type ModalProps = {
  message: string;
};

const Modal: React.FC<ModalProps> = ({ message }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Error</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
