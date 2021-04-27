import { RESET_JOKES, SAVE_FAV, GET_FAV, SET_JOKES } from '../actions/joke'

const initialState = {
  jokes: [],
  fav: [],
  loading: false,
  error: '',
}

const jokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOKES:
      return {
        ...state,
        jokes: action.payload,
      }
    case RESET_JOKES:
      return {
        jokes: [],
      }
    case GET_FAV:
      return {
        ...state,
        fav: action.payload,
      }
    case SAVE_FAV:
      return {
        ...state,
        fav: action.payload,
      }
    default:
      return state
  }
}

export default jokeReducer
