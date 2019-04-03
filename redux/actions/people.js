import Prismic from 'prismic-javascript';
import * as action_types from './action_types';
import PrismicConfig from '../../prismic-configuration';

export async function getPeopleContent(lang) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const response = await api.query(Prismic.Predicates.at('document.type', 'people'), { lang });
    return response.results[0];
  } catch (error) {
    return { results: null, error };
  }
}

const fetchPeopleRequest = () => ({ type: action_types.FETCH_PEOPLE_REQUEST });

export const fetchPeopleSuccess = response => ({
  type: action_types.FETCH_PEOPLE_SUCCESS,
  response,
});

const fetchPeopleError = error => ({ type: action_types.FETCH_PEOPLE_FAILURE, error });

export const fetchPeople = language => async (dispatch) => {
  try {
    dispatch(fetchPeopleRequest());
    const peopleContent = await getPeopleContent(language);
    const peopleSections = [];
    Object.keys(peopleContent.data).forEach((key) => {
      if (key.startsWith('body')) {
        peopleSections.push(peopleContent.data[key][0]);
      }
    });
    return dispatch(fetchPeopleSuccess(peopleSections));
  } catch (error) {
    return dispatch(fetchPeopleError(error));
  }
};
