import movies from "./movies";
import tvshows from "./tvshows";
import { combineReducers } from "redux";

export default combineReducers({
  movies,
  tvshows
});
