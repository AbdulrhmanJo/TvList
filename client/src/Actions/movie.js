import { getMovieInitialData } from "../utils/API";
export const RECEIVE_MOVIES = "RECEIVE_MOVIES";

export function receiveMovies(movies) {
  return {
    type: RECEIVE_MOVIES,
    movies
  };
}

export function getInitialData() {
  return dispatch => {
    return getMovieInitialData().then(movies => {
      dispatch(receiveMovies(movies));
    });
  };
}
