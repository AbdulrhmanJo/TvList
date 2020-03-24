import Comedy from "../icons/comedy.png";
import Crime from "../icons/crime.png";
import Drama from "../icons/drama.png";
import Horror from "../icons/horror.png";
import Scifi from "../icons/sifi.png";
import History from "../icons/history.png";
import Action from "../icons/action.png";
import Thriller from "../icons/thriller.png";
import Romance from "../icons/romance.png";
import Western from "../icons/western.png";
import War from "../icons/war.png";
import Adventure from "../icons/adventure.png";
import TVShow from "../icons/tvshow.png";
import Music from "../icons/music.png";
import Fantasy from "../icons/fantasy.png";
import Animation from "../icons/animation.png";
import Decumentary from "../icons/decumentary.png";
import Mystery from "../icons/mystery.png";
import Family from "../icons/family.png";

export function getIcon(genreName) {
  switch (genreName) {
    case "Comedy":
      return Comedy;
    case "Crime":
      return Crime;
    case "Horror":
      return Horror;
    case "Drama":
      return Drama;
    case "Science Fiction":
      return Scifi;
    case "History":
      return History;
    case "Action":
      return Action;
    case "Thriller":
      return Thriller;
    case "Western":
      return Western;
    case "Romance":
      return Romance;
    case "War":
      return War;
    case "Animation":
      return Animation;
    case "Documentary":
      return Decumentary;
    case "Music":
      return Music;
    case "Fantasy":
      return Fantasy;
    case "TV Movie":
      return TVShow;
    case "Adventure":
      return Adventure;
    case "Mystery":
      return Mystery;
    case "Family":
      return Family;
    default:
      break;
  }
}
// export default images;
