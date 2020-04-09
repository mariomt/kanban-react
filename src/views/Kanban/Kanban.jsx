import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import './Kanban.css';
import CardList from '../../components/CardsList/CardList';
import CardModal from '../../components/CardModal/CardModal';

// queries 
const LIST_QUERY = gql`{
    getLists{
      _id
      title
      tasks{
        _id
        title
        description
        date,
        members {
          _id
          firstName
          lastName
        }
        comments {
          _id
          content
        }
      }
      canAddCards
    }
}`;

export default  function Kanban(props) {
  const { loading, error, data } = useQuery(LIST_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data.getLists);
  return <KanbanUI data={data.getLists}/>
}

class KanbanUI extends React.Component {
  state = {
    showAddList: false,
    canAddList: false,
    modal: {
      modalIsOpen: false,
      card: null,
      list: ''
    },
    lists: [],
    nexListId: 4,
    listTitle: ''
  }

  componentDidMount() {
    this.setState({lists: this.props.data});
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
          return <CardList key={cardlist._id} title={cardlist.title} cards={cardlist.tasks} canAddCards={cardlist.canAddCards} openModal={this.handleOpenModal} />
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