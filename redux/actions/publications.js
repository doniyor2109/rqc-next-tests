import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';
// actions for quering API for multiple documents by type

const fetchPublicationsRequest = orderings => ({
  type: actionTypes.FETCH_PUBLICATIONS_REQUEST,
  orderings,
});

export const fetchPublicationsSuccess = response => ({
  type: actionTypes.FETCH_PUBLICATIONS_SUCCESS,
  response,
});

const fetchPublicationsFailure = error => ({
  type: actionTypes.FETCH_PUBLICATIONS_FAILURE,
  error,
});

async function getPublications(lang, pageSize, page, orderings) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const response = await api.query(Prismic.Predicates.at('document.type', 'publication'),
      {
        lang,
        pageSize,
        page,
        orderings,
        fetchLinks: ['science_group.groupname'],
      });
    return response;
  } catch (error) {
    return { results: null, error };
  }
}

async function getPubsSearchedByAPI(lang, orderings, searchRequest) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const response = await api.query(
      [Prismic.Predicates.at('document.type', 'publication'),
        Prismic.Predicates.fulltext('document', searchRequest)],
      {
        lang,
        pageSize: 100,
        orderings,
        fetchLinks: ['science_group.groupname'],
      },
    );
    return response.results;
  } catch (error) {
    return { results: null, error };
  }
}

export async function getAllResultsfromPaginatedAPI(language, orderings) {
  let nextPage = '';
  let page = 1;
  const resultsAcc = [];
  while (nextPage !== null) {
    const res = await getPublications(language, 100, page, orderings);
    const { results } = res;
    if (results !== null) {
      nextPage = res.next_page;
      resultsAcc.push(...results);
      page += 1;
    } else return results.error;
  }
  return resultsAcc;
}

export const fetchPublications = (language, activeTag, searchRequest) => async (dispatch) => {
  let orderings = '[my.publication.journal_name]';
  if (activeTag === 'SORT_DATE') {
    orderings = '[my.publication.date desc]';
  } else if (activeTag === 'SORT_NAME') {
    orderings = '[my.publication.title]';
  }
  dispatch(fetchPublicationsRequest());
  let pubs;
  if (searchRequest) {
    // do search
    pubs = await getPubsSearchedByAPI(language, orderings, searchRequest);
  } else {
    // do simple fetch
    pubs = await getAllResultsfromPaginatedAPI(language, orderings);
  }
  return dispatch(fetchPublicationsSuccess(pubs));
};

export const fetchPublicationsforResearch = (language, pageSize) => async (dispatch) => {
  dispatch(fetchPublicationsRequest());
  const pubs = await getPublications(language, pageSize, 1, '[my.publication.date desc]');
  return dispatch(fetchPublicationsSuccess(pubs.results));
};
