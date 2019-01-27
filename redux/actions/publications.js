import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchPublicationsRequest = () => ({ type: action_types.FETCH_PUBLICATIONS_REQUEST })

const fetchPublicationsSuccess = (response) => ({ type: action_types.FETCH_PUBLICATIONS_SUCCESS, response })

const fetchPublicationsFailure = (error) => ({ type: action_types.FETCH_PUBLICATIONS_FAILURE, error })

export const fetchPublications = () => (dispatch) => {
  dispatch(fetchPublicationsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'publication'),
                                                  { lang: '*',
                                                  fetchLinks : ['author.name', 
                                                                'journal.name', 
                                                                'journal.url']
                                                  })
                      .then(response => dispatch(fetchPublicationsSuccess(response)))
                      .catch(error => dispatch(fetchPublicationsFailure(error)))
          })
}

// actions for quering API for a team single document by UID

const SearchRequest = (text) => ({ type: action_types.SEARCH_AUTHORS_REQUEST, text });

const SearchSuccess = (text, response) => ({ type: action_types.SEARCH_AUTHORS_SUCCESS, text, response });

const SearchFailure = (text, error) => ({ type: action_types.SEARCH_AUTHORS_FAILURE, text, error });

export const SearchAuthors = (text) => (dispatch) => {
  dispatch(SearchRequest(text));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.fulltext('my.publication.authors1', text),
                                                        { fetchLinks : ['author.name', 
                                                                        'journal.name', 
                                                                        'journal.url'
                                                  ]})
                      .then(response => {
                                          dispatch(SearchSuccess(text, response));
                                        })
                      .catch(error => dispatch(SearchFailure(text, error)))
          })
}