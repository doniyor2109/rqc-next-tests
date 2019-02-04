import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchPublicationsRequest = () => ({ type: action_types.FETCH_PUBLICATIONS_REQUEST })

const fetchPublicationsSuccess = (response) => ({ type: action_types.FETCH_PUBLICATIONS_SUCCESS, response })

const fetchPublicationsFailure = (error) => ({ type: action_types.FETCH_PUBLICATIONS_FAILURE, error })

export const fetchPublications = (language) => (dispatch) => {
  dispatch(fetchPublicationsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'publication'),
                                                  { lang: language,
                                                  fetchLinks : ['author.name', 
                                                                'journal.name', 
                                                                'journal.url']
                                                  })
                      .then(response => dispatch(fetchPublicationsSuccess(response)))
                      .catch(error => dispatch(fetchPublicationsFailure(error)))
          })
}

// actions for quering API for a team single document by UID

const SearchRequest = (text) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_REQUEST, text });

const SearchSuccess = (text, response) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_SUCCESS, text, response });

const SearchFailure = (text, error) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_FAILURE, text, error });

export const SearchPuiblicationbyAuthor = (author) => (dispatch) => {
  dispatch(SearchRequest(author));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.fulltext('my.publication.authors', author))
                      .then(response => {
                                          dispatch(SearchSuccess(author, response));
                                        })
                      .catch(error => dispatch(SearchFailure(author, error)))
          })
}