import AsyncStorage from '@react-native-async-storage/async-storage'
import { allAnekdot } from '../../shared/regexp'

export const SET_JOKES = 'SET_JOKES'
export const RESET_JOKES = 'RESET_JOKES'
export const DELETE_JOKE = 'DELETE_JOKE'
export const SAVE_FAV = 'SAVE_FAV'
export const GET_FAV = 'GET_FAV'

export const setJokes = () => {
  return async (dispatch) => {
    // let url = `https://www.cbr-xml-daily.ru/archive/${yyyy}/${mm}/${dd}/daily_json.js`
    try {
      const response = await fetch(
        'https://nameless-falls-80997.herokuapp.com/https://allanecdots.ru/vidgets/allanecdots.js?n=10&nocensored=1',
        // 'https://nameless-falls-80997.herokuapp.com/https://www.anekdot.ru/rss/randomu.html',
        {
          type: 'GET',
          headers: {
            'X-Requested-With': 'HttpRequest',
          },
        }
      )
      const resData = await response.text()
      const jokesArr = allAnekdot(resData)
      dispatch({ type: SET_JOKES, payload: jokesArr })
    } catch (error) {
      console.log(error)
    }
  }
}

export const resetJokes = () => (dispatch) => {
  dispatch({ type: RESET_JOKES })
}

export const getFav = () => async (dispatch) => {
  const fav = await AsyncStorage.getItem('jokes')
  const parsedFav = JSON.parse(fav)
  dispatch({ type: GET_FAV, payload: parsedFav })
}

export const saveFav = (joke) => async (dispatch) => {
  const id = Math.round(new Date().getTime() * Math.random()).toString()
  const fav = await AsyncStorage.getItem('jokes')
  const updatedFav = JSON.parse(fav)
  updatedFav.push({ id, joke })
  await AsyncStorage.setItem('jokes', JSON.stringify(updatedFav))
  dispatch({ type: SAVE_FAV, payload: updatedFav })
}

export const deleteJoke = (id) => async (dispatch, getState) => {
  const state = getState()
  const fav = state.joke.fav
  const updatedFav = fav.filter((joke) => joke.id !== id)
  await AsyncStorage.setItem('jokes', JSON.stringify(updatedFav))
  dispatch({ type: DELETE_JOKE, payload: updatedFav })
}
