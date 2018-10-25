import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a news single document by UID

const fetchPhotoByUidRequest = (uid) => ({ type: action_types.FETCH_PHOTO_BY_UID_REQUEST, uid });

const fetchPhotoByUidSuccess = (uid, response) => ({ type: action_types.FETCH_PHOTO_BY_UID_SUCCESS, uid, response });

const fetchPhotoByUidFailure = (uid, error) => ({ type: action_types.FETCH_PHOTO_BY_UID_FAILURE, uid, error });

export const fetchPhotoByUid = (language, uid) => (dispatch) => {
  dispatch(fetchPhotoByUidRequest(uid));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('my.mediakit_photo_gallery.uid', uid), { lang : language })
                      .then(response => {
                                          dispatch(fetchPhotoByUidSuccess(uid, response));
                                        })
                      .catch(error => dispatch(fetchPhotoByUidFailure(uid, error)))
          })
}

