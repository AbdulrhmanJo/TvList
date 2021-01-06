const RECIEVE_LISTS = "RECIEVE_LISTS";
const CREATE_LIST = "CREAT_LIST";
const UPDATE_LIST = "UPDATE_LIST";
const DELETE_LIST = "UPDATE_LIST";

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
