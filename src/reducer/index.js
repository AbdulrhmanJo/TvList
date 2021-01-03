import movies from "./movies";
import tvshows from "./tvshows";
import search from "./search";
import lists from "./lists";
import { combineReducers } from "redux";

export default combineReducers({
  movies,
  tvshows,
  search,
  lists,
});
