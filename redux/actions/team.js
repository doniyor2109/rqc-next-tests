import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a team single document by UID

export const fetchTeamRequest = (uid) => ({ type: action_types.FETCH_TEAM_REQUEST, uid });

export const fetchTeamSuccess = (uid, response) => ({ type: action_types.FETCH_TEAM_SUCCESS, uid, response });

export const fetchTeamFailure = (uid, error) => ({ type: action_types.FETCH_TEAM_FAILURE, uid, error });

export const fetchTeam = (uid) => (dispatch) => {
  dispatch(fetchTeamRequest(uid));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('my.science_group.uid', uid), { lang : "*", 
                                                                                  fetchLinks : ['scientist.name', 
                                                                                                  'scientist.position', 
                                                                                                  'scientist.photo'
                                                                                                  ] }, )
                      .then(response => {
                                          dispatch(fetchTeamSuccess(uid, response));
                                        })
                      .catch(error => dispatch(fetchTeamFailure(uid, error)))
          })
}