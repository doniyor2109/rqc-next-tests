import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

export async function getTeamGraph(uid, lang) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const teamQuery = `{
      science_group {
        ...science_groupFields
        group_leader {
          ...on scientist {
            name
            position
            photo
          }
        }
      }
    }`;
    const responseGraph = await api.query(Prismic.Predicates.at('my.science_group.uid', uid),
      {
        graphQuery: teamQuery,
        lang,
      });
    return responseGraph.results[0];
  } catch (error) {
    return { results: null, error };
  }
}


// actions for quering API for a team single document by UID

export const fetchTeamRequest = uid => ({ type: actionTypes.FETCH_TEAM_REQUEST, uid });

export const fetchTeamSuccess = (uid, response) => ({
  type: actionTypes.FETCH_TEAM_SUCCESS,
  uid,
  response,
});

export const fetchTeamFailure = (uid, error) => ({
  type: actionTypes.FETCH_TEAM_FAILURE,
  uid,
  error,
});
