import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';


export async function getPeopleContentGraph(lang) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const peopleQuery = `{
      people2 {
        ...people2Fields
        body {
          ...on _______ {
            non-repeat {
              title
              hash
              subtitle
            }
            repeat {
              person {
                ...on person {
                  ...personFields
                }
              }
            }
          }
        }
      }
    }`;
    const responseGraph = await api.query(Prismic.Predicates.at('document.type', 'people2'),
      {
        graphQuery: peopleQuery,
        lang,
      });
    return responseGraph.results[0];
  } catch (error) {
    return { results: null, error };
  }
}


const fetchPeopleRequest = () => ({ type: actionTypes.FETCH_PEOPLE_REQUEST });

export const fetchPeopleSuccess = response => ({
  type: actionTypes.FETCH_PEOPLE_SUCCESS,
  response,
});

const fetchPeopleError = error => ({ type: actionTypes.FETCH_PEOPLE_FAILURE, error });

export const fetchPeople = language => async (dispatch) => {
  try {
    dispatch(fetchPeopleRequest());
    const peopleContent = await getPeopleContentGraph(language);
    return dispatch(fetchPeopleSuccess(peopleContent));
  } catch (error) {
    return dispatch(fetchPeopleError(error));
  }
};
