import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

export const fetchResearchPageRequest = () => ({ type: actionTypes.FETCH_RESEARCH_PAGE_REQUEST });

export const fetchResearchPageSuccess = response => ({ type: actionTypes.FETCH_RESEARCH_PAGE_SUCCESS, response });

export const fetchResearchPageError = error => ({ type: actionTypes.FETCH_RESEARCH_PAGE_FAILURE, error });

export const fetchResearchPage = language => (dispatch) => {
  dispatch(fetchResearchPageRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'research'),
        { lang: language })
        .then(response => dispatch(fetchResearchPageSuccess(response)))
        .catch(error => dispatch(fetchResearchPageError(error)));
    });
};
