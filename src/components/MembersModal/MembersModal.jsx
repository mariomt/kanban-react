import React from 'react';

import Modal from '../Modal/Modal';

import './MembersModal.css'
export default function MembersModal(props) {
  const getPos = (elem) => {
    let tmp=elem;
    let left=tmp.offsetLeft;
    let top=tmp.offsetTop;
    while (tmp=tmp.offsetParent) left += tmp.offsetLeft;
    tmp=elem;
    while(tmp=tmp.offsetParent) top+=tmp.offsetTop;
    return [left,top];
  }

  let position = [];
  if(props.dataModal.isOpen) {
    const $userList = document.getElementById('user-list');
    position = getPos($userList);
  }

  return (
    <Modal 
      isOpen={props.dataModal.isOpen} 
      onClose={props.onClose} 
      className="ChangeListModal"
      id="cap-modal-list"
      idCont= "modal-list"
      posStyles ={{
        left: `${position[0]+15}px`,
        top: `${position[1]+15}px`
      }}
    >
      <div className="MembersModal__title">
        <p>Miembros</p>
      </div>
      <div className="MembersModal__content">
        <input type="text" name="filter" placeholder="Buscar miembros" />
        <div className="MembersModal__cards-section">
          <div className="MembersModal__cards-section-title">
            <p>Miembros del tablero</p>
            <div className="MembersModal__cards-section-members-wraper">
              {props.dataModal.card? props.dataModal.card.members.map( memberitem => {
                return <MemberCard key={memberitem._id} member={memberitem} selected onClick={props.onClick} card={props.dataModal.card} />
              }): ''}
              {
                props.users.map( memberItem => {
                  let user = props.dataModal.card 
                      ? props.dataModal.card.members.findIndex( u => u._id===memberItem._id )
                      : -1;
                  if(user<0) {
                    return <MemberCard key={memberItem._id} member={memberItem} onClick={props.onClick} card={props.dataModal.card} />
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const MemberCard = (props) => {
  return (
    <div className="MembersModal__member-card" onClick={()=>{ props.onClick(props.card, props.member._id,props.selected)}}>
      <div className="MembersModal__member-icon">
        <div className="circle-icon">
          <span>{`${props.member.firstName.charAt(0)}${props.member.lastName.charAt(0)}`}</span>
        </div>
      </div>
      <div className="MembersModal__member-name">
        <p>{`${props.member.firstName} ${props.member.lastName}`}</p>
      </div>
      <div className="MembersModal__member-is-selected">
        {props.selected && (
          <i className="fas fa-check"></i>
        )}
      </div>
    </div>
  );
}