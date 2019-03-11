import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchPublicationsRequest = () => ({ type: action_types.FETCH_PUBLICATIONS_REQUEST })

const fetchPublicationsSuccess = (response) => ({ type: action_types.FETCH_PUBLICATIONS_SUCCESS, response })

const fetchPublicationsFailure = (error) => ({ type: action_types.FETCH_PUBLICATIONS_FAILURE, error })

export const fetchPublications = (language, pageSize, pageNumber, activeTag, results) => (dispatch) => {

  const ordering = (activeTag === "SORT_DATE") 
                    ? '[my.publication.date desc]'
                    : (activeTag === "SORT_NAME" 
                        ? '[my.publication.title]'
                        : '[my.publication.journal_name]'
                      )
  dispatch(fetchPublicationsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'publication'),
                                                  { lang: language,
                                                    pageSize: pageSize, 
                                                    page: pageNumber,
                                                    orderings : ordering,
                                                    fetchLinks : ['science_group.groupname']
                                                    })
                      .then(response => {

                                // первый if разграничивает использование fetchPublictions для страницы publications,
                                // где нужны все публикации, и поэтому мы используем рекурсию в actions
                                // и для страницы research, где нам нужны только 3 последних публикации, поэтому вызов
                                // fetchPublictions происходит без массива results для накопления результатов

                                if (results) {
                                  results = results.concat(response.results)
                                  if (response.next_page !== null) {
                                    dispatch(fetchPublications(language, pageSize, pageNumber + 1, activeTag, results))
                                  } else {
                                    dispatch(fetchPublicationsSuccess(results))
                                  }
                                } else {
                                  dispatch(fetchPublicationsSuccess(response.results))
                                }
                            })
                      .catch(error => dispatch(fetchPublicationsFailure(error)))
                  }
          )
}


// // actions for quering API for a team single document by UID

// const SearchPublicationbyAuthorRequest = (text) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_REQUEST, text });

// const SearchPublicationbyAuthorSuccess = (text, response) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_SUCCESS, text, response });

// const SearchPublicationbyAuthorFailure = (text, error) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_FAILURE, text, error });

// export const SearchPublicationbyAuthor = (author, pageSize, pageNumber) => (dispatch) => {
//   dispatch(SearchPublicationbyAuthorRequest(author))
//   return Prismic.getApi(PrismicConfig.apiEndpoint)
//     .then(api => {api.query(Prismic.Predicates.fulltext('my.publication.authors', author), 
//                                                          {
//                                                           pageSize: pageSize, 
//                                                           page: pageNumber,
//                                                          })
//                       .then(response => dispatch(SearchPublicationbyAuthorSuccess(author, response)))
//                       .catch(error => dispatch(SearchPublicationbyAuthorFailure(author, error)))
//           })
// }

const searchPublicationsRequest = (text) => ({ type: action_types.SEARCH_PUBLICATIONS_REQUEST, text });

const searchPublicationsSuccess = (text, response) => ({ type: action_types.SEARCH_PUBLICATIONS_SUCCESS, text, response });

const searchPublicationsFailure = (error) => ({ type: action_types.SEARCH_PUBLICATIONS_FAILURE, error });

export const searchPublication = (text) => (dispatch) => {
  dispatch(searchPublicationsRequest(text));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query([Prismic.Predicates.at('document.type', 'publication'), 
                            Prismic.Predicates.fulltext('document', text)],{
                                                          pageSize: 100, 
                                                         })
                      .then(response => dispatch(searchPublicationsSuccess(text, response)))
                      .catch(error => dispatch(searchPublicationsFailure(error)))
          })
}