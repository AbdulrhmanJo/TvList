import { RECEIVE_MOVIES } from "../Actions/movie"

export default function movies(state={}, action){
    switch(action.type){
        case RECEIVE_MOVIES:
            return {
                ...state,
                ...action.movies
            }
        default:
            return state
    }
}