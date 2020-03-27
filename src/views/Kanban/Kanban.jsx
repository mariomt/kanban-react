import React from 'react';

import './Kanban.css';
import CardList from '../../components/CardsList/CardList';

// components

export default class Kanban extends React.Component {
  state = {
    lists: [
      {id: 1,  title:"Pendiente", cards: [], canaddcards: true },
      {id: 2, title: "En progreso", cards: [], canaddcards: false },
      {id: 3, title: "Finalizado", cards: [], canaddcards: false },
    ]
  }
  render() {
    return (
      <div className="Kanban">
        {this.state.lists.map( cardlist => {
          return <CardList key={cardlist.id} title={cardlist.title} canAddCards={cardlist.canaddcards} />
        }
        )}
      </div>
    )
  }
}