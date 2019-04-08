import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';
// actions for quering API for multiple documents by type

const fetchNewsRequest = () => ({ type: actionTypes.FETCH_NEWS_REQUEST });

const fetchNewsSuccess = response => ({ type: actionTypes.FETCH_NEWS_SUCCESS, response });

const fetchNewsFailure = error => ({ type: actionTypes.FETCH_NEWS_FAILURE, error });

export const fetchNews = (language, pageSize) => (dispatch) => {
  dispatch(fetchNewsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'news'),
        {
          lang: language,
          pageSize,
          orderings: '[my.news.manual_date_of_publication desc]',
        })
        .then(response => dispatch(fetchNewsSuccess(response)))
        .catch(error => dispatch(fetchNewsFailure(error)));
    });
};
