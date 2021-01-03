const RECIEVE_LISTS = "RECIEVE_LISTS";
const CREATE_LIST = "CREAT_LIST";
const UPDATE_LIST = "UPDATE_LIST";
const DELETE_LIST = "UPDATE_LIST";

export function createList(list) {
  return {
    type: CREATE_LIST,
    list,
  };
}
