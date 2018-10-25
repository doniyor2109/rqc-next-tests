import { LANGUAGE_CHANGED_IN_INTERFACE, COOKIE_LANGUAGE_CHANGE } from "../actions/action_types.js"
import { Cookies } from 'react-cookie';

const cookie = new Cookies()
const initialState = {
  currentLanguage: typeof cookie.get('language') === 'undefined' ? 'ru' : cookie.get('language')
}

function setCookies(state, action) {
  cookie.set('language', action.language, { path: '/' })
  return {...state}
}

function changeUI(state, action) {
  return { ...state, currentLanguage: action.language}
}


export const language = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_CHANGED_IN_INTERFACE:
      return changeUI(state, action);
    case COOKIE_LANGUAGE_CHANGE:
      return setCookies(state, action)
    default:
      return state;
  }
}
