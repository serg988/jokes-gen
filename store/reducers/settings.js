import { SET_FONT, SET_SOURCE } from '../actions/settings'
import {urlSources, fontSizes} from '../../constants/constants'

const initialState = {
  url: urlSources[0],
  urlNo: 0,
  fontSize: 16,
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOURCE:
      return {
        ...state,
        url: urlSources[action.payload],
        urlNo: action.payload,
      }
    case SET_FONT:
      return {
        ...state,
        fontSize: fontSizes[action.payload],
      }

    default:
      return state
  }
}

export default settingsReducer
