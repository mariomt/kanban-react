import React from 'react';

import './CardList.css';

export default class CardList extends React.Component {
  state = {
    addCard: false,
    titleCard: ''
  }

  handleOnClickAddList = e => {
    this.setState({addCard: true});
  }

  handleFocusOut = e => {
    if(!e.target.value) {
      this.setState({ addCard: false});
    }
  }

  handleEnterKey = e => { 
    if(e.keyCode === 13 ) {
      e.preventDefault();
      this.saveNewCard();
      
      this.setState({ addCard: false, titleCard: '' });
    }
  }

  handleOnClickSaveNewCard = e => {

    this.saveNewCard();
    this.setState({ addCard: false, titleCard: '' });
  }
  saveNewCard = () => {
    console.log(this.state.titleCard)
  }

  handleOnchange = e =>{
    this.setState({[e.target.name]:e.target.value})
    
  }

  render() {
    return (
      <div className="CardList">
        <div className="CardList__title">
          <h3>{this.props.title}</h3>
        </div>
        <div className="CardList__content">
          { this.props.cards.map( card => {
            return <Card key={card._id} card={card} list={this.props.title} onClick={this.props.openModal} />
          })}
        </div>
        {this.props.canAddCards && (
          <div className="CardList__newCard">
            {this.state.addCard && (
              <div className="CardList__addCard">
                <textarea onChange={this.handleOnchange} name="titleCard" autoFocus onBlur={this.handleFocusOut} onKeyDown={this.handleEnterKey} className="CardList__textarea" value={this.state.titleCard}></textarea>
                <button onClick={this.handleOnClickSaveNewCard} className="btn btn-primary">Guardar</button>
              </div>
            )}
            {!this.state.addCard && (
              <div onClick={this.handleOnClickAddList} className="CardList__add">
                <p>+ Añadir tarea</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}


function Card(props) {
  return (
    <div className="CardList__card" onClick={() => props.onClick(props.card, props.list)}>
      <p>{props.card.title}</p>
    </div>
  )
}