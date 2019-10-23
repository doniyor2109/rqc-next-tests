import { setLanguage } from 'redux-i18n';
import { LANGUAGE_CHANGED_BY_USER, COOKIE_LANGUAGE_CHANGE } from './actionTypes';

const setCookies = language => ({ type: COOKIE_LANGUAGE_CHANGE, language });

export const userClickedOnLanguageChanger = language => ({
  type: LANGUAGE_CHANGED_BY_USER,
  language,
});

export const switchLanguage = language => (dispatch) => {
  dispatch(userClickedOnLanguageChanger(language));
  dispatch(setLanguage(language));
  dispatch(setCookies(language));
};

export const switchLanguageProgrammatically = language => (dispatch) => {
  dispatch(setLanguage(language));
  dispatch(setCookies(language));
};
