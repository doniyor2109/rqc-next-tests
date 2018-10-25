import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a news single document by UID

const fetchPostByUidRequest = (uid) => ({ type: action_types.FETCH_POST_BY_UID_REQUEST, uid });

const fetchPostByUidSuccess = (uid, response) => ({ type: action_types.FETCH_POST_BY_UID_SUCCESS, uid, response });

const fetchPostByUidFailure = (uid, error) => ({ type: action_types.FETCH_POST_BY_UID_FAILURE, uid, error });

export const fetchPostByUid = (type, uid, language) => (dispatch) => {
  dispatch(fetchPostByUidRequest(uid));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('my.' + type + '.uid', uid), { lang : language })
                      .then(response => {
                                          dispatch(fetchPostByUidSuccess(uid, response));
                                        })
                      .catch(error => dispatch(fetchPostByUidFailure(uid, error)))
          })
}

// Action for Apitest component

export const selectPost = (uid) => ({ type: action_types.SELECT_POST, uid });
