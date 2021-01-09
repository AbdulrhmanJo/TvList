const RECIEVE_LISTS = "RECIEVE_LISTS";
const CREATE_LIST = "CREAT_LIST";
const UPDATE_LIST = "UPDATE_LIST";
const ADD_SHOW_TO_LIST = "ADD_SHOW_TO_LIST";
const DELETE_SHOW_FROM_LIST = "DELETE_SHOW_FROM_LIST";

export function createList(newList) {
  return {
    type: CREATE_LIST,
    newList,
  };
}

export function updateList(updatedList) {
  return {
    type: UPDATE_LIST,
    updatedList,
  };
}

export function addShow(show, listId) {
  return {
    type: ADD_SHOW_TO_LIST,
    listId,
    show,
  };
}

export function deleteShow(showId, listId) {
  return {
    type: DELETE_SHOW_FROM_LIST,
    listId,
    showId,
  };
}
