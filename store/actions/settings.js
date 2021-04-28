export const SET_SOURCE = 'SET_SOURCE'
export const SET_FONT = 'SET_FONT'

export const setSource = (urlNo) => (dispatch) => {
  dispatch({ type: SET_SOURCE, payload: urlNo })
}

export const setFontSize = (fontSize) => (dispatch) => {
  dispatch({ type: SET_FONT, payload: fontSize })
}
