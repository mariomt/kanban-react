import React from 'react';

import './Kanban.css';
import CardList from '../../components/CardsList/CardList';
import CardModal from '../../components/CardModal/CardModal';

// components

export default class Kanban extends React.Component {
  state = {
    showAddList: false,
    canAddList: false,
    modal: {
      modalIsOpen: false,
      card: null,
      list: ''
    },
    lists: [
      {id:1, title:"Pendiente", cards: [
              {id:1, title:"Mi primer tarea colocada en la primer tarjeta", description:"Una pequeña descripción", date: "26/03/2020", members: [], comments: [{id:1, content: "Mi comentario muy descriptivo"}]},
            ], canaddcards: true},
      {id:2, title:"En progreso", cards: [
              {id:1, title:"Algo que mostrar en la tarjeta", description:"Descripción exajerada para poner algo que tenga bastante texto", date: "03/03/2020", members: [], comments: []},
            ], canaddcards: true},
      {id:3, title:"Finalizado", cards: [], canaddcards: false},
    ],
    nexListId: 4,
    listTitle: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFocusOut = e => {
    if (!e.target.value) {
      this.setState({showAddList: false})
    }
  }

  createNewList = () => {
    this.setState( state => {
      const lists = state.lists.concat({
        id: state.nexListId,
        title: state.listTitle,
        cards: [],
        canaddcards:true
      });

      return {
        showAddList: false,
        lists,
        listTitle: '',
        nexListId: this.state.nexListId+1
      }
    })
  }

  handleOpenModal = (card, list) => {
    this.setState({modal: {modalIsOpen: true, card: card, list: list}})
  }

  handleCloseModal = () => {
    this.setState({modal: {modalIsOpen: false, card: null, list: ''}})
  }

  render() {
    return (
      <div className="Kanban">
        {this.state.lists.map( cardlist => {
          return <CardList key={cardlist.id} title={cardlist.title} cards={cardlist.cards} canAddCards={cardlist.canaddcards} openModal={this.handleOpenModal} />
        }
        )}
        { this.state.canAddList && (
          <div className="Kanban__addList">
          {this.state.showAddList && (
            <div className="Kanban__addList-add">
              <input 
                name="listTitle"
                autoFocus 
                onBlur={this.handleFocusOut}
                type="text" 
                onChange={this.onChange}
                value={this.state.listTitle}
                placeholder="Introduce el título de la lista" 
              />
              <button onClick={this.createNewList} className="btn btn-primary">Guardar</button>
            </div>
          )}
          {!this.state.showAddList && (
            <div onClick={() => { this.setState({ showAddList: true }) }} className="Kanban__addList-option">
              <span>+ Añadir lista</span>
            </div>
          )}
        </div>
        )}
        <CardModal dataModal={this.state.modal} onClose={this.handleCloseModal}/>
      </div>
    )
  }
}