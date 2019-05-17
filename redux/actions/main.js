import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

// actions for getting data for Main Slider
const fetchMainRequest = () => ({ type: actionTypes.FETCH_MAIN_REQUEST });

export const fetchMainSuccess = (id, response) => ({
  type: actionTypes.FETCH_MAIN_SUCCESS,
  id,
  response,
});

export const fetchMainFailure = (id, error) => ({
  type: actionTypes.FETCH_MAIN_FAILURE,
  id,
  error,
});

export const getContentbyID = async (id, language) => {
  const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
  const response = await api.query(Prismic.Predicates.at('document.id', id),
    { lang: language });
  return response;
};

export const fetchMain = (id, language) => async (dispatch) => {
  try {
    dispatch(fetchMainRequest());
    const response = await getContentbyID(id, language);
    return dispatch(fetchMainSuccess(id, response));
  } catch (err) {
    return dispatch(fetchMainFailure(id, err));
  }
};


// actions for getting data for Sci Slider
export const fetchMainSciSliderRequest = () => ({ type: actionTypes.FETCH_MAIN_SCI_SLIDER_REQUEST });

export const fetchMainSciSliderSuccess = response => ({ type: actionTypes.FETCH_MAIN_SCI_SLIDER_SUCCESS, response });

export const fetchMainSciSliderFailure = error => ({ type: actionTypes.FETCH_MAIN_SCI_SLIDER_FAILURE, error });

export const fetchMainSciSlider = language => (dispatch) => {
  dispatch(fetchMainSciSliderRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'scientist'),
        {
          lang: language,
          fetchLinks: ['science_group.groupname',
            'science_group.uid'],
        })
        .then(response => dispatch(fetchMainSciSliderSuccess(response)))
        .catch(error => dispatch(fetchMainSciSliderFailure(error)));
    });
};
