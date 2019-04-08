import { LANGUAGE_CHANGED_BY_USER, COOKIE_LANGUAGE_CHANGE } from "../actions/actionTypes"

const initialState = {
  userClicked: 0
}

function setCookies(state, action) {
  document.cookie="language=" + action.language
  return {...state}
}

function setUserLang(state, action) {
  return {...state, userLang: action.language, userClicked: (state.userClicked + 1)}
}

export const language = (state = initialState, action) => {
  switch (action.type) {
    case COOKIE_LANGUAGE_CHANGE:
      return setCookies(state, action)
    case LANGUAGE_CHANGED_BY_USER:
      return setUserLang(state, action)
    default:
      return state;
  }
}
