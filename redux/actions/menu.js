import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

// actions for getting data for Main Slider
const fetchMenuRequest = () => ({ type: actionTypes.FETCH_MENU_REQUEST });

export const fetchMenuSuccess = response => ({
  type: actionTypes.FETCH_MENU_SUCCESS,
  response,
});

export const fetchMenuFailure = error => ({
  type: actionTypes.FETCH_MENU_FAILURE,
  error,
});

export const getMenu = async (language) => {
  const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
  const response = await api.query(Prismic.Predicates.at('document.type', 'menu'),
    { lang: language });
  return response;
};

export const fetchMenu = language => async (dispatch) => {
  try {
    dispatch(fetchMenuRequest());
    const menu = await getMenu(language);
    dispatch(fetchMenuSuccess(menu));
  } catch (err) {
    dispatch(fetchMenuFailure(err));
  }
};
