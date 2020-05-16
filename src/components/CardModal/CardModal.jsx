import React from 'react';

import Modal from '../Modal/Modal';

import './CardModal.css'

export default function CardModal(props) {
  const card = props.dataModal.card;
  const heandlerKey = (e)=>{
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      switch (e.target.name) {
        case 'title':
          props.saveTitle(card,e.target.value,props.dataModal.list);
          break;
      
        case 'description':
          props.saveDescription(card,e.target.value,props.dataModal.list);
          break;

        case 'commnet':
          props.saveComment(card,e.target.value,props.dataModal.list);
          e.target.value='';
          break
      }
      e.target.blur();
    }
  }
  return (
    <Modal 
      isOpen={props.dataModal.modalIsOpen} 
      onClose={props.onClose} 
      className="CardModal"
      firstCap={{className: 'm-color-5'}}
    >
      <div className="CardModal__title">
        <i className="fas fa-window-maximize"></i>
        <input type="text" name="title" placeholder="Título de la modal" onKeyPress={heandlerKey} autoComplete="off" defaultValue={card? card.title : ''} />
        <p>en lista <span id="change-list" className="CardModal__change-list" onClick={props.openListModal}>{props.dataModal.list? props.dataModal.list.title: ''}</span></p>
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
            {card? card.members.map(member => {
              return (
                <div key={member._id} className="CardModal__user-icon"><span>{member.firstName.charAt(0)}{member.lastName.charAt(0)}</span></div>
              )
            }):''}
          </div>
          
          <div className="CardModal__add-user" onClick={() => {props.openMembersModal(card)}} id="user-list">
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>

      <div className="CardModal__description">
        <i className="fas fa-align-left"></i>
        <textarea name="description" className="CardModal__description-textarea" onKeyPress={heandlerKey} placeholder="Agrega una descripción del problema" defaultValue={card? card.description : ''}></textarea>
      </div>

      <div className="CardModal__comment">
        <i className="far fa-comments"></i><input type="text" name="commnet" className="CardModal__comment-input" onKeyPress={heandlerKey} autoComplete="off" placeholder="Añadir comentario..." />
      </div>

      <div className="modal-comments" id="modal-comments">
        {card? card.comments.map(comment => (
          <div key={comment._id} className="CardModal__comment-post">
            <i className="far fa-user"></i>
            <p>{comment.content}</p>
          </div>
        )) : ''}
      </div>
    </Modal>
  )
}
