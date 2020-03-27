import React from 'react';

import './Kanban.css';
import CardList from '../../components/CardsList/CardList';

// components

export default class Kanban extends React.Component {
  state = {
    showAddList: false,
    canAddList: false,
    lists: [
      {id:1, title:"Pendiente", cards: [
              {id:1, title:"Mi primer tarea colocada en la primer tarjeta"},
              {id:2, title:"Mi primer tarea colocada en la primer tarjeta"},
              {id:3, title:"Mi primer tarea colocada en la primer tarjeta esta tarjeta tiene mas texto para ver como se ve"},
            ], canaddcards: true},
      {id:2, title:"En progreso", cards: [], canaddcards: true},
      {id:3, title:"Finalizado", cards: [{id:4, title:"Algo para mostrar al final"}], canaddcards: false},
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
  render() {
    return (
      <div className="Kanban">
        {this.state.lists.map( cardlist => {
          return <CardList key={cardlist.id} title={cardlist.title} cards={cardlist.cards} canAddCards={cardlist.canaddcards} />
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
      </div>
    )
  }
}