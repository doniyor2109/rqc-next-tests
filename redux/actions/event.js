import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a news single document by UID

export const fetchEventByUidRequest = (uid) => ({ type: action_types.FETCH_EVENT_BY_UID_REQUEST, uid });

export const fetchEventByUidSuccess = (uid, response) => ({ type: action_types.FETCH_EVENT_BY_UID_SUCCESS, uid, response });

export const fetchEventByUidFailure = (uid, error) => ({ type: action_types.FETCH_EVENT_BY_UID_FAILURE, uid, error });
