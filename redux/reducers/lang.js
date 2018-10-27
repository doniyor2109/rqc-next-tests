import { LANGUAGE_CHANGED_IN_INTERFACE, COOKIE_LANGUAGE_CHANGE } from "../actions/action_types.js"

const initialState = {}

function setCookies(state, action) {
  document.cookie="language=" + action.language
  return {...state}
}

export const language = (state = initialState, action) => {
  switch (action.type) {
    case COOKIE_LANGUAGE_CHANGE:
      return setCookies(state, action)
    default:
      return state;
  }
}
