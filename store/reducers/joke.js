import {
  RESET_JOKES,
  SAVE_FAV,
  GET_FAV,
  SET_JOKES,
  DELETE_JOKE,
  NEXT,
} from '../actions/joke'

const initialState = {
  jokes: [],
  fav: [],
  loading: false,
  error: '',
  next: false,
  watched: 0,
}

const jokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOKES:
      const updatedJokes = [...state.jokes, ...action.payload]
      return {
        ...state,
        jokes: updatedJokes,
      }
    case NEXT:
      return {
        ...state,
        next: false,
        watched: state.watched + 100,
      }

    case RESET_JOKES:
      return {
        ...state,
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
    case DELETE_JOKE:
      return {
        ...state,
        fav: action.payload,
      }
    default:
      return state
  }
}

export default jokeReducer
