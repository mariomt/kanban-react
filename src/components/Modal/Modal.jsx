import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

export default function Modal(props) {
  if (!props.isOpen) {
    return null;
  }
  
  return (
    ReactDOM.createPortal(
      <div className="Modal">
        <div className={`Modal__container ${props.className}`}>
          <div className="Modal__close">
            <button className="Modal__close-button" onClick={props.onClose}>X</button>
          </div>
          {props.children}
      </div>
    </div>,
      document.getElementById('root-modal')
    )
  );
  
}