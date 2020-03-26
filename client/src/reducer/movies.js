import { RECEIVE_MOVIES } from "../Actions/movie";
import { RECEIVE_SECTION_MOVIES } from "../Actions/shared";

export default function movies(state = {}, action) {
  switch (action.type) {
    case RECEIVE_MOVIES:
      return {
        ...state,
        ...action.movies
      };
    case RECEIVE_SECTION_MOVIES:
      return {
        ...state,
        sectionMovies: action.movies
      };
    default:
      return state;
  }
}
