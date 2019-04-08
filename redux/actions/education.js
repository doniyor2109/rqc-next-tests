import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

const fetchEducationRequest = () => ({ type: actionTypes.FETCH_EDUCATION_REQUEST });

export const fetchEducationSuccess = response => ({
  type: actionTypes.FETCH_EDUCATION_SUCCESS,
  response,
});

export const fetchEducationFailure = error => ({
  type: actionTypes.FETCH_EDUCATION_FAILURE,
  error,
});

export async function getEducationContent(language) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const educationContent = await api.query(Prismic.Predicates.at('document.type', 'education'),
      {
        lang: language,
        fetchLinks: ['science_group.groupname'],
        orderings: '[my.education.teamlead.name]',
      });
    return educationContent;
  } catch (error) {
    return { results: null, error };
  }
}

export const fetchEducation = language => async (dispatch) => {
  dispatch(fetchEducationRequest());
  try {
    const education = await getEducationContent(language);
    return dispatch(fetchEducationSuccess(education));
  } catch (error) {
    return dispatch(fetchEducationFailure(error));
  }
};
