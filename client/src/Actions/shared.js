import { getInitialData } from "../utils/API";
import { receiveMovies } from "./movie";
import { receiveTV } from "./tvshows";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ movies, tvShows }) => {
      dispatch(receiveMovies(movies));
      dispatch(receiveTV(tvShows));
    });
  };
}
