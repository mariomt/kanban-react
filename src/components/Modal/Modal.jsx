import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

export default function Modal(props) {
  if (!props.isOpen) {
    return null;
  }

  const closeClick = (e) => {
    e.stopPropagation();
    props.onClose();
  }
  
  return (
    ReactDOM.createPortal(
      <div className={`Modal ${props.firstCap? props.firstCap.className: ''}`} id={props.id} onClick={closeClick}>
        <div className={`Modal__container ${props.className}`} style={props.posStyles} id={props.idCont} onClick={(e)=>{ e.stopPropagation()}}>
          <div className="Modal__close">
            <button className="Modal__close-button" onClick={closeClick}>X</button>
          </div>
          {props.children}
      </div>
    </div>,
      document.getElementById('root-modal')
    )
  );
  
}