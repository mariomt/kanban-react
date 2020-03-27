import React from 'react';

import Modal from '../Modal/Modal';

import './CardModal.css'

export default function CardModal(props) {
  const card = props.dataModal.card;
  return (
    <Modal isOpen={props.dataModal.modalIsOpen} onClose={props.onClose} className="CardModal">
      <div className="CardModal__title">
        <i className="fas fa-window-maximize"></i>
        <input type="text" name="title" placeholder="Título de la modal" autoComplete="off" defaultValue={card? card.title : ''} />
        <p>en lista <span className="CardModal__change-list">{props.dataModal.list}</span></p>
      </div>

      <div className="CardModal-metadata">
        <p>creado el <span id="created-date">{card? card.date:'dd/mm/yyyy'}</span></p>
      </div>

      <div className="CardModal__users-section">
        <div className="modal-user-title">
          <p>MIEMBROS</p>
        </div>
        <div className="CardModal__users-wraper">
          <div className="CardModel__users-content">
            <div className="CardModal__user-icon"><span>MM</span></div>
          </div>
          
          <div className="CardModal__add-user">
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>

      <div className="CardModal__description">
        <i className="fas fa-align-left"></i>
        <textarea name="description" className="CardModal__description-textarea" placeholder="Agrega una descripción del problema" defaultValue={card? card.description : ''}></textarea>
      </div>

      <div className="CardModal__comment">
        <i className="far fa-comments"></i><input type="text" name="commnet" className="CardModal__comment-input" placeholder="Añadir comentario..." />
      </div>

      <div className="modal-comments">
        {card? card.comments.map(comment => (
          <div key={comment.id} className="CardModal__comment-post">
            <i className="far fa-user"></i>
            <p>{comment.content}</p>
          </div>
        )) : ''}
      </div>
    </Modal>
  )
}
