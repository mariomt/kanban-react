import React from 'react';

import './CardList.css';

export default class CardList extends React.Component {
  state = {
    addCard: false
  }

  handleOnClickAdd = e => {
    this.setState({addCard: true});
  }

  handleFocusOut = e => {
    if(!e.target.value) {
      this.setState({ addCard: false });
    }

  }

  handleEnterKey = e => { 
    if(e.keyCode === 13 ) {
      e.preventDefault();
      console.log(e.target.value);
      e.target.value='';
      this.setState({ addCard: false });
    }
  }

  render() {
    return (
      <div className="CardList">
        <div className="CardList__title">
          <h3>{this.props.title}</h3>
        </div>
        <div className="CardList__content">
          
        </div>
        {this.props.canAddCards && (
          <div className="CardList__newCard">
            {this.state.addCard && (
              <div className="CardList__addCard">
                <textarea autoFocus onBlur={this.handleFocusOut} onKeyDown={this.handleEnterKey} className="CardList__textarea"></textarea>
                <button className="btn btn-primary">Guardar</button>
              </div>
            )}
            <div onClick={this.handleOnClickAdd} className="CardList__add">
              <p>+ Añadir tarea</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}