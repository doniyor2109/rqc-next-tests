import * as actionTypes from './actionTypes'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchAuthorsRequest = () => ({ type: actionTypes.FETCH_AUTHORS_REQUEST })

const fetchAuthorsSuccess = (response) => ({ type: actionTypes.FETCH_AUTHORS_SUCCESS, response })

const fetchAuthorsFailure = (error) => ({ type: actionTypes.FETCH_AUTHORS_FAILURE, error })

export const fetchAuthors = () => (dispatch) => {
  dispatch(fetchAuthorsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'author'),
                                                  { lang: '*',
                                                    orderings : '[my.author.name]' })
                      .then(response => dispatch(fetchAuthorsSuccess(response)))
                      .catch(error => dispatch(fetchAuthorsFailure(error)))
          })
}
