import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a news single document by UID

export const fetchVideoByUidRequest = (uid) => ({ type: action_types.FETCH_VIDEO_BY_UID_REQUEST, uid });

export const fetchVideoByUidSuccess = (uid, response) => ({ type: action_types.FETCH_VIDEO_BY_UID_SUCCESS, uid, response });

export const fetchVideoByUidFailure = (uid, error) => ({ type: action_types.FETCH_VIDEO_BY_UID_FAILURE, uid, error });

export const fetchVideoByUid = (uid) => (dispatch) => {
  dispatch(fetchVideoByUidRequest(uid));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('my.mediakit_video.uid', uid), { lang : "*" })
                      .then(response => {
                                          dispatch(fetchVideoByUidSuccess(uid, response));
                                        })
                      .catch(error => dispatch(fetchVideoByUidFailure(uid, error)))
          })
}

