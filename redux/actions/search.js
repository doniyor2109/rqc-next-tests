import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a team single document by UID

export const SearchRequest = (text) => ({ type: action_types.SEARCH_REQUEST, text });

export const SearchSuccess = (text, response) => ({ type: action_types.SEARCH_SUCCESS, text, response });

export const SearchFailure = (text, error) => ({ type: action_types.SEARCH_FAILURE, text, error });

export const Search = (text) => (dispatch) => {
  dispatch(SearchRequest(text));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.fulltext('document', text), { lang : "*" })
                      .then(response => {
                                          dispatch(SearchSuccess(text, response));
                                        })
                      .catch(error => dispatch(SearchFailure(text, error)))
          })
}