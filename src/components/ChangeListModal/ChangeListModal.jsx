import React, {useState, useEffect} from 'react';

import Modal from '../Modal/Modal';

import './ChangeListModal.css';

export default function ChangeListModal(props) {
  

  const posSelected = props.dataModal.posSelected || '';
  const [changeListModal, setChangeListModal] = useState({listId:'', nameListSelected: '', positions: [], selected: ''});

  const arrayNumbers = (listId) => {
    let array = [];
    let len = 0;
    const list = props.lists.find(listItem => listItem._id===listId);
    list.tasks ? len=list.tasks.length : len= 0;
    let positionSelected = posSelected;
    if(list._id != props.dataModal.listSelected._id){
      len++;
      positionSelected = len;
    }
    for(let i=1; i<=len; i++) {
      array.push(i);
    }
    return [list.title,array, positionSelected];
  }


  

  useEffect(()=>{
    const result = arrayNumbers(props.dataModal.listSelected._id);
    setChangeListModal({ listId:props.dataModal.listSelected._id, nameListSelected: result[0], positions: result[1], selected: result[2]})
  },[])

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
    const $changeList = document.getElementById('change-list');
    position = getPos($changeList);
  }
  
  
  const heandlerClickMover = () => {
    props.onClick(props.dataModal.listSelected._id,changeListModal.listId,props.dataModal.card._id, changeListModal.selected);
  }

  const handlerChangeList = () => {
    const list = document.getElementById('select-list').value;
    const result = arrayNumbers(list);
    setChangeListModal({listId:list, nameListSelected:result[0], positions: result[1], selected: result[2]})
  }

  const handlerChangePos = () => {
    const poss = document.getElementById('select-position').value;
    setChangeListModal({...changeListModal, selected: poss});
  }
  return (
    <Modal 
      isOpen={props.dataModal.isOpen} 
      onClose={props.onClose} 
      className="ChangeListModal"
      id="cap-modal-list"
      idCont= "modal-list"
      posStyles ={{
        left: `${position[0]}px`,
        top: `${position[1]}px`
      }}
    >
      <div className="ChangeListModal__title">
        <p>Mover tarjeta</p>
      </div>
      <div className="ChangeListModal__content">
        <p>Seleccionar destino</p>
        <div className="form-grid">
          <div className="button-link setting space-right threequaters">
            <span className="label">Lista</span>
            <span className="value js-list-value" id="select-list-title">{changeListModal.nameListSelected.toUpperCase()}</span>
            <select name="select-list" id="select-list" value={changeListModal.listId} onChange={handlerChangeList}>
              {props.lists.map(list => {
                return <option key={list._id} value={list._id}>{list.title}</option>
              })}
            </select>
          </div>
          <div className="button-link setting">
            <span className="label">Posición</span>
            <span className="value js-list-value" id="select-position-title">{changeListModal.selected}</span>
            <select name="select-position" id="select-position" value={changeListModal.selected} onChange={handlerChangePos}>
              {changeListModal.positions.map(number => {
                return <option key={number} value={number}>{number}</option>
              })}
            </select>
          </div>
        </div>
        <input type="submit" value="Mover" className="submit" id="btn-changeList" onClick={heandlerClickMover}/>
      </div>
    </Modal>
  );
}
