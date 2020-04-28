import * as actionTypes from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  item: {},
}

function fetchMenuSuccess(state, action) {
  const item = action.response.results[0]
  return { ...state, isFetching: false, item }
}

export const menu = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MENU_REQUEST:
      return { ...state, isFetching: true }

    case actionTypes.FETCH_MENU_SUCCESS:
      return fetchMenuSuccess(state, action)

    case actionTypes.FETCH_MENU_FAILURE:
      console.log('FETCH_MENU_FAILURE', action.error)
      return { ...state, isFetching: false }

    default:
      return state
  }
}
