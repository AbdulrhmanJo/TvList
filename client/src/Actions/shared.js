import { receiveMovies } from './movie'
import { handleInitialData } from '../utils/API'

export function getInitialData(){
    return (dispatch) => {
        return handleInitialData()
        .then(movies => {
            dispatch(receiveMovies(movies))
        })
    }
}