import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

export async function getStudyGraph(lang) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const studyQuery = `{
      study_materials {
        ...study_materialsFields
      }
    }`;
    const responseGraph = await api.query(Prismic.Predicates.at('document.type', 'study_materials'),
      {
        graphQuery: studyQuery,
        lang,
      });
    return responseGraph.results;
  } catch (error) {
    return { results: null, error };
  }
}

// actions for quering API for a Study single document by UID

export const fetchStudyRequest = () => ({ type: actionTypes.FETCH_STUDY_MATERIALS_REQUEST });

export const fetchStudySuccess = response => ({
  type: actionTypes.FETCH_STUDY_MATERIALS_SUCCESS,
  response,
});

export const fetchStudyFailure = error => ({
  type: actionTypes.FETCH_STUDY_MATERIALS_FAILURE,
  error,
});


export const fetchStudy = language => async (dispatch) => {
  try {
    dispatch(fetchStudyRequest());
    const studyContent = await getStudyGraph(language);
    return dispatch(fetchStudySuccess(studyContent));
  } catch (error) {
    return dispatch(fetchStudyFailure(error));
  }
};
