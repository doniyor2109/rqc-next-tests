import { setLanguage } from "redux-i18n"
import  {LANGUAGE_CHANGED_IN_INTERFACE, COOKIE_LANGUAGE_CHANGE } from './action_types'

const setCookies = (language) => ({type: COOKIE_LANGUAGE_CHANGE, language})

export const switchLanguage = (language) => (dispatch) => {
    dispatch(setLanguage(language))
    dispatch(setCookies(language))
}
  