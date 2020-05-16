import { request } from 'graphql-request';
import {
  QUERY_GET_LISTS,
  QUERY_CREATE_TASK,
  QUERY_EDIT_TASK_TITLE,
  QUERY_EDIT_TASK_DESCRIPTION,
  QUERY_ADD_TASK_COMMENT,
  QUERY_GET_USERS,
  QUERY_ADD_USER_TO_TASK,
  QUERY_REMOVE_USER_FROM_TASK,
  QUERY_CHANGE_CARD_OF_LIST
} from './constQueries';
const API = 'http://localhost:8000/api';

export default class KanbanServices {
  /**
   * @description Obtiene todas las listas con todos sus datos internos.
   * @returns {Promise} Regresa una promesas con la obtención de las listas o un error si algo sale mal.
   */
  static getAllLists = () => {
    return new Promise( async (resolve, reject) => {
      try {
        let result = await request(API,QUERY_GET_LISTS);
        resolve(result.getLists);
      } catch (error) {
        reject(error);
      }
      
    });
  }

  /**
   * @description Obtiene una lista con todos los usuarios.
   * @returns {Promise} Regresa una promesa con la obtención de lo usuarios o un error
   */
  static getAllUsers = () => {
    return new Promise( async (resolve, reject) => {
      try {
        let result = await request(API, QUERY_GET_USERS);
        resolve(result.getUsers);
      } catch (error) {
        reject(error);
      }
    });
  }

  static addUserToCard = (taskID, userID) => {
    return new Promise ( async (resolve, reject) => {
      try {
        let variables = { taskID: taskID, userID:userID };
        let result = await request(API, QUERY_ADD_USER_TO_TASK, variables);
        resolve(result.addMembersToTask);
      } catch (error) {
        reject(error);
      }
    });
  }

  static removeUserFromCard = (taskID, userID) => {
    return new Promise( async(resolve, reject) => {
      try {
        let variables = { taskID: taskID, userID:userID };
        let result = await request(API, QUERY_REMOVE_USER_FROM_TASK, variables);
        resolve(result.removeUserFromTask);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description Cambia la tarea de lista o de posición. Para solamente mover de posición la tarea envia el mismo ID de la prevListID y en listID indicando el ID de la lista donde se encuentra la tarea.
   * @param {String} prevListID String representando el ID de la lista donde se encuentra actualmente la tarea
   * @param {String} listID String repesentado el ID de la lista a donde se cambiara la tarea
   * @param {String} cardID String representado el ID de la tarea
   * @param {Number} position Número de la posición donde se colocar la tarea
   * @returns {Array} Arreglo con las listas actualizadas 
   */
  static changeCardOfList = (prevListID, listID, cardID, position) => {
    return new Promise(async (resolve, reject) => {
      try {
        let variables = {prevListID: prevListID, listID: listID, taskID:cardID, position: parseInt(position,10) }
        let result = await request(API, QUERY_CHANGE_CARD_OF_LIST,variables);
        resolve(result.moveTaskOfList);
      } catch (error) {
        reject(error);
      }

    });
  }

  /**
   * @description Crea una tarea en una lista
   * @param {String} listID String representado el ID de la lista a la cual se agregará la nueva tarea
   * @param {String} taskTitle String representado el texto que tomara como título la tarea
   * @returns {Promise} Regresa una promesa la cual debe obtener la tarea creada o un error.
   */
  static createTask= (listID, taskTitle) => {
    return new Promise( async (resolve, reject) => {
      try {
        let variables = { listID: listID , title: taskTitle};
        let result = await request(API,QUERY_CREATE_TASK,variables);
        resolve(result.addTaskToList);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * @description Edita el titulo de una tarea.
   * @param {String} taskID Valor de una ID de la tarea a modificar.
   * @param {String} title Texto nuevo a colocar en la tarjeta .
   * @returns {Promise} regresa la tarea editada o un error si algo sale mal.
   */
  static editTaskTitle = (taskID, title) => {
    return new Promise(async (resolve, reject) => {
      try {
        let variables = { taskID: taskID, title: title};
        let result = await request(API,QUERY_EDIT_TASK_TITLE,variables);
        resolve(result.editTask);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description Edita la descripcion de una tarea.
   * @param {String} taskID Representa el id de la tarea a modificar.
   * @param {String} description Texto nuevo a colocar como descripción.
   * @returns {Promise} Regresa la tarea editada o un error si algo sale mal.
   */
  static editTaskDescription = (taskID, description) => {
    return new Promise( async (resolve, reject) => {
      try {
        const variables = { taskID: taskID, description: description };
        let result = await request(API,QUERY_EDIT_TASK_DESCRIPTION,variables);
        resolve(result.editTask);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * @description Añade un comentario a una tarea.
   * @param {String} taskID Representa el id de la tarea.
   * @param {String} comment Texto que se colocará como comentario.
   * @returns {Promise} Regresa la tarea con el nuevo comentario o un error si algo sale mal.
   */
  static addCommentToTask = (taskID, comment) => {
    return new Promise( async (resolve, reject) => {
      try {
        const variables = { taskID: taskID, content: comment};
        let result = await request(API, QUERY_ADD_TASK_COMMENT, variables);
        resolve(result.addTaskCommnet);
      } catch (error) {
        reject(error);
      }
    });
  }
}