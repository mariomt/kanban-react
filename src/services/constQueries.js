const TASK_FIELDS = `_id
title
description
date
position
members {
  _id
  firstName
  lastName
}
comments {
  _id
  content
}`;

const LIST_FIELDS = `_id
title
tasks{
  ${TASK_FIELDS}
}
canAddCards
`;

export const QUERY_GET_LISTS = `{
  getLists{
    ${LIST_FIELDS}
  }
}`;

export const QUERY_CREATE_TASK = `mutation ($listID: ID!, $title: String!){
  addTaskToList(listID: $listID, input: {
    title: $title
  }){
    ${LIST_FIELDS}
  }
}`;

export const QUERY_EDIT_TASK_TITLE = `mutation ($taskID: ID!,$title: String!) {
  editTask(id: $taskID, input: {
    title: $title
  }){
    ${TASK_FIELDS}
  }
}`;

export const QUERY_EDIT_TASK_DESCRIPTION = `mutation ($taskID: ID!, $description: String!) {
  editTask(id: $taskID, input: {
    description: $description
  }){
    ${TASK_FIELDS}
  }
}`;

export const QUERY_ADD_TASK_COMMENT = `mutation ($taskID: ID!, $content: String!) {
  addTaskCommnet(taskID: $taskID, input: {
    content: $content
  }){
    ${TASK_FIELDS}
  }
}`;


export const QUERY_GET_USERS = `{
  getUsers {
    _id
    firstName
    lastName
  }
}`;

export const QUERY_ADD_USER_TO_TASK = `mutation ($taskID: ID!, $userID: ID!) {
  addMembersToTask(taskID:$taskID, userID: $userID){
    ${TASK_FIELDS}
  }
}`;


export const QUERY_REMOVE_USER_FROM_TASK = `mutation ($taskID: ID!, $userID: ID!) {
  removeUserFromTask(taskID:$taskID, userID: $userID){
    ${TASK_FIELDS}
  }
}`;

export const QUERY_CHANGE_CARD_OF_LIST = `mutation ($prevListID: ID!, $listID: ID!, $taskID: ID!, $position: Int!) {
  moveTaskOfList(prevListID:$prevListID, listID:$listID, taskID:$taskID, position:$position){
    ${LIST_FIELDS}
  }
}`;

