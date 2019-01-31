import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a news single document by UID

export const fetchArticleByUidRequest = (uid) => ({ type: action_types.FETCH_ARTICLE_BY_UID_REQUEST, uid });

export const fetchArticleByUidSuccess = (uid, response) => ({ type: action_types.FETCH_ARTICLE_BY_UID_SUCCESS, uid, response });

export const fetchArticleByUidFailure = (uid, error) => ({ type: action_types.FETCH_ARTICLE_BY_UID_FAILURE, uid, error });

export const fetchArticleByUid = (uid) => (dispatch) => {
  dispatch(fetchArticleByUidRequest(uid));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('my.news.uid', uid), { lang : "*" })
                      .then(response => {
                                          dispatch(fetchArticleByUidSuccess(uid, response));
                                        })
                      .catch(error => dispatch(fetchArticleByUidFailure(uid, error)))
          })
}
