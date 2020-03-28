import { RECEIVE_TV } from "../Actions/tvshows";

export default function tvshows(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TV:
      return {
        ...state,
        ...action.tv
      };
    default:
      return state;
  }
}
