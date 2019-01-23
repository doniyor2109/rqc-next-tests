import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchAuthorsRequest = () => ({ type: action_types.FETCH_AUTHORS_REQUEST })

const fetchAuthorsSuccess = (response) => ({ type: action_types.FETCH_AUTHORS_SUCCESS, response })

const fetchAuthorsFailure = (error) => ({ type: action_types.FETCH_AUTHORS_FAILURE, error })

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
