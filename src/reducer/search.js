import {
    SEARCH
} from "../Actions/search";

export default function search(state = "", action) {
    switch (action.type) {
        case SEARCH:
            return action.search;
        default:
            return state;
    }
}