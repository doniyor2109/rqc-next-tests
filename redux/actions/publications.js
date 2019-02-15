import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchPublicationsRequest = () => ({ type: action_types.FETCH_PUBLICATIONS_REQUEST })

const fetchPublicationsSuccess = (response) => ({ type: action_types.FETCH_PUBLICATIONS_SUCCESS, response })

const fetchPublicationsFailure = (error) => ({ type: action_types.FETCH_PUBLICATIONS_FAILURE, error })

export const fetchPublications = (language, pageSize, pageNumber) => (dispatch) => {
  dispatch(fetchPublicationsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'publication'),
                                                  { lang: language,
                                                    pageSize: pageSize, 
                                                    page: pageNumber,
                                                    fetchLinks : ['author.name', 
                                                                  'science_group.groupname',
                                                                  'journal.name', 
                                                                  'journal.url']
                                                    })
                      .then(response => dispatch(fetchPublicationsSuccess(response)))
                      .catch(error => dispatch(fetchPublicationsFailure(error)))
          })
}

// actions for quering API for a team single document by UID

const SearchPublicationbyAuthorRequest = (text) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_REQUEST, text });

const SearchPublicationbyAuthorSuccess = (text, response) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_SUCCESS, text, response });

const SearchPublicationbyAuthorFailure = (text, error) => ({ type: action_types.SEARCH_PUBLICATION_BY_AUTHOR_FAILURE, text, error });

export const SearchPublicationbyAuthor = (author, pageSize, pageNumber) => (dispatch) => {
  dispatch(SearchPublicationbyAuthorRequest(author));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.fulltext('my.publication.authors', author), 
                                                         {
                                                          pageSize: pageSize, 
                                                          page: pageNumber,
                                                         })
                      .then(response => dispatch(SearchPublicationbyAuthorSuccess(author, response)))
                      .catch(error => dispatch(SearchPublicationbyAuthorFailure(author, error)))
          })
}

const SearchPublicationbyScienceGroupRequest = (group) => ({ type: action_types.SEARCH_PUBLICATION_BY_SCIENCE_GROUP_REQUEST, group });

const SearchPublicationbyScienceGroupSuccess = (group, response) => ({ type: action_types.SEARCH_PUBLICATION_BY_SCIENCE_GROUP_SUCCESS, group, response });

const SearchPublicationbyScienceGroupFailure = (group, error) => ({ type: action_types.SEARCH_PUBLICATION_BY_SCIENCE_GROUP_FAILURE, group, error });

export const SearchPublicationbyScienceGroup = (group, pageSize, pageNumber) => (dispatch) => {
  dispatch(SearchPublicationbyScienceGroupRequest(group));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('my.publication.science_group', group), 
                                                         {
                                                          pageSize: pageSize, 
                                                          page: pageNumber,
                                                          fetchLinks : ['science_group.groupname']
                                                         })
                      .then(response => dispatch(SearchPublicationbyScienceGroupSuccess(group, response)))
                      .catch(error => dispatch(SearchPublicationbyScienceGroupFailure(group, error)))
          })
}