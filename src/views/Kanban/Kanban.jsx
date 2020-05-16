import React from 'react';

import './Kanban.css';
import CardList from '../../components/CardsList/CardList';
import CardModal from '../../components/CardModal/CardModal';
import KanbanServices from '../../services/Kanban';
import ChangeListModal from '../../components/ChangeListModal/ChangeListModal';
import MembersModal from '../../components/MembersModal/MembersModal';

export default class Kanban extends React.Component {
  state = {
    loading: true,
    error: null,
    showAddList: false,
    canAddList: false,
    modal: {
      modalIsOpen: false,
      card: null,
      list: null
    },
    changeListModal: {
      isOpen: false,
      card: null,
      listSelected: [],
      posSelected: ''
    },
    membersModal: {
      isOpen: false,
      card: null,
    },
    lists: [],
    users: [],
    listTitle: ''
  }

  componentDidMount() {
    this.fetchLists();
    this.fetchUsers();
  }

  fetchLists = async() => {
    try {
      let result = await KanbanServices.getAllLists();
      this.setState({ loading: false, lists: result})
    } catch (error) {
      this.setState({ loading: false, error: error});
    }
  }

  fetchUsers = async() => {
    try {
      let result = await KanbanServices.getAllUsers();
      this.setState({users: result});
    } catch (error) {
      this.setState({error:error})
    }
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
    
  }

  createTask = async (title, list) => {
    try {
      let listPosition = this.state.lists.findIndex(li => li===list);
      
      if(listPosition<0) {
        console.error('Ocurrio un error');
        return;
      }

      let result = await KanbanServices.createTask(list._id,title);
      
      let newList = [...this.state.lists];
      newList[listPosition]=result;
      this.setState({ lists:newList });
      
    } catch (error) {
      console.error(error);
    }
  }

  saveTaskTitle = async (card, title, list)=> {
    try {
      let listPosition = this.state.lists.findIndex(li => li===list);
      let taskPosition = list.tasks.findIndex( task => task === card);

      if(listPosition<0 || taskPosition<0) {
        console.error('Ocurrio un error');
        return;
      }

      let result = await KanbanServices.editTaskTitle(card._id,title);

      let newList = [...this.state.lists];
      newList[listPosition].tasks[taskPosition] = result;
      this.setState({modal: {
        modalIsOpen: true,
        card: newList[listPosition].tasks[taskPosition],
        list: newList[listPosition]
      }});
      this.setState({lists: newList});
    } catch (error) {
      console.log(error);
    }
  }


  saveTaskDescription = async (card, description, list) => {
    try {
      let listPosition = this.state.lists.findIndex(li => li===list);
      let taskPosition = list.tasks.findIndex( task => task === card);

      if(listPosition<0 || taskPosition<0) {
        console.error('Ocurrio un error');
        return;
      }

      let result = await KanbanServices.editTaskDescription(card._id,description);

      let newList = [...this.state.lists];
      newList[listPosition].tasks[taskPosition] = result;
      this.setState({modal: {
        modalIsOpen: true,
        card: newList[listPosition].tasks[taskPosition],
        list: newList[listPosition]
      }});
      this.setState({lists: newList});
    } catch (error) {
      console.log(error);
    }
  }


  saveTaskComment = async (card, comment, list) => {
    try {
      let listPosition = this.state.lists.findIndex(li => li===list);
      let taskPosition = list.tasks.findIndex( task => task === card);

      if(listPosition<0 || taskPosition<0) {
        console.error('Ocurrio un error');
        return;
      }
      
      let result = await KanbanServices.addCommentToTask(card._id,comment);
      let newList = [...this.state.lists];
      newList[listPosition].tasks[taskPosition] = result;
      this.setState({lists: newList});

      this.setState({modal: {
        modalIsOpen: true,
        card: newList[listPosition].tasks[taskPosition],
        list: newList[listPosition]
      }});
    } catch (error) {
      console.log(error);
    }
  }

  

  handleMemberItem = async (card, userID, selected) => {
    let result;
    if(selected){
      result = await KanbanServices.removeUserFromCard(card._id,userID);
    } else{
      result = await KanbanServices.addUserToCard(card._id, userID);
    }
    this.setState({modal: {
      ...this.state.modal,
      card: result
    }});
    this.fetchLists();
    this.setState({membersModal:{isOpen:false, card:null}})
  }

  handleOpenChangeListModal = () => {
    this.setState({changeListModal: {isOpen: true,card:this.state.modal.card, listSelected: this.state.modal.list, posSelected: this.state.modal.card.position}});
  }

  handleCloseChangeListModal = () => {
    this.setState({changeListModal: {isOpen: false, listSelected: [], posSelected: '' }})
  }
  handleChangeList = async (prevList, list, card, pos) => {
    try {
      let result = await KanbanServices.changeCardOfList(prevList, list, card, pos);
      this.setState({
        modal: {
          modalIsOpen: false,
          card: null,
          list: null
        },
        changeListModal: {
          isOpen: false,
          card: null,
          listSelected: [],
          posSelected: ''
        },
        membersModal: {
          isOpen: false,
          card: null,
        },
        lists:result
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleOpenMembersModal = (card) => {
    this.setState({ membersModal: { isOpen: true, card: card } });
  }

  handleCloseMembersModal = () => {
    this.setState({ membersModal: {isOpen: false} });
  }

  handleOpenModal = (card, list) => {
    this.setState({modal: {modalIsOpen: true, card: card, list: list}});
  }

  handleCloseModal = () => {
    this.setState({modal: {modalIsOpen: false, card: null, list: null}})
  }

  render() {
    if(this.state.loading) return <h2>Loading...</h2>;
    if(this.state.error) return <p>Ups! :(</p>
    return (
      <div className="Kanban">
        {this.state.lists.map( cardlist => {
          return <CardList 
                    key={cardlist._id}
                    list={cardlist} 
                    canAddCards={cardlist.canAddCards} 
                    openModal={this.handleOpenModal} 
                    crateTask={this.createTask}
                  />
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
        <CardModal 
          dataModal={this.state.modal} 
          onClose={this.handleCloseModal}
          saveTitle={this.saveTaskTitle}
          saveDescription={this.saveTaskDescription}
          saveComment={this.saveTaskComment}
          openListModal={this.handleOpenChangeListModal}
          openMembersModal={this.handleOpenMembersModal}
        />
        {this.state.changeListModal.isOpen && (
          <ChangeListModal
            dataModal={this.state.changeListModal}
            lists={this.state.lists}
            onClose= {this.handleCloseChangeListModal}
            onClick={this.handleChangeList}
          />
        )}
        
        <MembersModal 
          dataModal={this.state.membersModal}
          users={this.state.users}
          onClose= {this.handleCloseMembersModal}
          onClick={this.handleMemberItem}
        />
      </div>
    )
  }
}