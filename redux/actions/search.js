import * as actionTypes from './actionTypes'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for quering API for a team single document by UID

export const SearchRequest = (text) => ({ type: actionTypes.SEARCH_REQUEST, text });

export const SearchSuccess = (text, response) => ({ type: actionTypes.SEARCH_SUCCESS, text, response });

export const SearchFailure = (text, error) => ({ type: actionTypes.SEARCH_FAILURE, text, error });

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