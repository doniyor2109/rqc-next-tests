import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

async function getPerson(id, lang) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const response = await api.query(Prismic.Predicates.at('document.id', id),
      {
        lang,
      });
    return response.results;
  } catch (error) {
    return { results: null, error };
  }
}

const fetchPersonRequest = () => ({ type: actionTypes.FETCH_PERSON_REQUEST });

export const fetchPersonSuccess = response => ({
  type: actionTypes.FETCH_PERSON_SUCCESS,
  response,
});

const fetchPersonError = error => ({ type: actionTypes.FETCH_PERSON_FAILURE, error });

export const fetchPerson = (id, language) => async (dispatch) => {
  try {
    dispatch(fetchPersonRequest());
    const peopleContent = await getPerson(id, language);
    return dispatch(fetchPersonSuccess(peopleContent));
  } catch (error) {
    return dispatch(fetchPersonError(error));
  }
};
