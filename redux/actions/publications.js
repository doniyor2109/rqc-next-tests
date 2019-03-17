import Prismic from 'prismic-javascript';
import * as action_types from './action_types.js';
import PrismicConfig from '../../prismic-configuration';
// actions for quering API for multiple documents by type

const fetchPublicationsRequest = orderings => ({
  type: action_types.FETCH_PUBLICATIONS_REQUEST,
  orderings,
});

const fetchPublicationsSuccess = response => ({
  type: action_types.FETCH_PUBLICATIONS_SUCCESS,
  response,
});

const fetchPublicationsFailure = error => ({
  type: action_types.FETCH_PUBLICATIONS_FAILURE,
  error,
});

export const fetchPublications = (language, pageSize,
  pageNumber, activeTag, results) => (dispatch) => {
  let orderings = '[my.publication.journal_name]';
  if (activeTag === 'SORT_DATE') {
    orderings = '[my.publication.date desc]';
  } else if (activeTag === 'SORT_NAME') {
    orderings = '[my.publication.title]';
  }
  dispatch(fetchPublicationsRequest(orderings));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then((api) => {
      api.query(Prismic.Predicates.at('document.type', 'publication'),
        {
          lang: language,
          pageSize,
          page: pageNumber,
          orderings,
          fetchLinks: ['science_group.groupname'],
        })
        .then((response) => {
        // первый if разграничивает использование fetchPublictions для страницы publications,
        // где нужны все публикации, и поэтому мы используем рекурсию в actions
        // и для страницы research, где нам нужны только 3 последних публикации, поэтому вызов
        // fetchPublictions происходит без массива results для накопления результатов

          if (results) {
            results = results.concat(response.results);
            if (response.next_page !== null) {
              dispatch(fetchPublications(language, pageSize, pageNumber + 1, activeTag, results));
            } else {
              dispatch(fetchPublicationsSuccess(results));
            }
          } else {
            dispatch(fetchPublicationsSuccess(response.results));
          }
        })
        .catch(error => dispatch(fetchPublicationsFailure(error)));
    });
};


const searchPublicationsRequest = text => ({
  type: action_types.SEARCH_PUBLICATIONS_REQUEST,
  text,
});

const searchPublicationsSuccess = (text, response) => ({
  type: action_types.SEARCH_PUBLICATIONS_SUCCESS,
  text,
  response,
});

const searchPublicationsFailure = error => ({
  type: action_types.SEARCH_PUBLICATIONS_FAILURE,
  error,
});

export const searchPublication = (text, activeTag) => (dispatch) => {
  let orderings = '[my.publication.journal_name]';
  if (activeTag === 'SORT_DATE') {
    orderings = '[my.publication.date desc]';
  } else if (activeTag === 'SORT_NAME') {
    orderings = '[my.publication.title]';
  }

  dispatch(searchPublicationsRequest(text));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then((api) => {
      api.query([Prismic.Predicates.at('document.type', 'publication'),
        Prismic.Predicates.fulltext('document', text)], {
        pageSize: 100,
        orderings,
      })
        .then(response => dispatch(searchPublicationsSuccess(text, response)))
        .catch(error => dispatch(searchPublicationsFailure(error)));
    });
};
