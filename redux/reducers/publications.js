import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetchingPubs: false,
  isFetchingPubsbyAuthor: false,
  pubs: [],
  total_pages: 0,
  total_results_size: 0,
  nextPage: null,
  pubsbyAuthor: []
};

function fetchPublicationsSuccess(state, action) {
  const nextPage = action.response.next_page
  const total_results_size = action.response.total_results_size
  const total_pages = action.response.total_pages
  const pubs = action.response.results
  return {...state, isFetchingPubs: false, pubs, total_pages, total_results_size, nextPage}
}

function fetchAuthorsSuccess(state, action) {
  const nextPage = action.response.next_page
  const total_results_size = action.response.total_results_size
  const total_pages = action.response.total_pages
  const pubsbyAuthor = action.response.results
  return {...state, isFetchingPubsbyAuthor: false, pubsbyAuthor}
}


export const publications = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_PUBLICATIONS_REQUEST:
      return {...state, isFetchingPubs: true };

    case action_types.FETCH_PUBLICATIONS_SUCCESS:
      return fetchPublicationsSuccess(state, action);

    case action_types.FETCH_PUBLICATIONS_FAILURE:
      console.log("FETCH_PUBLICATIONS_FAILURE", action.error);
      return { ...state, isFetchingPubs: false };

    case action_types.SEARCH_AUTHORS_REQUEST:
      return {...state, isFetchingPubsbyAuthor: true };

    case action_types.SEARCH_AUTHORS_SUCCESS:
      return fetchAuthorsSuccess(state, action);

    case action_types.SEARCH_AUTHORS_FAILURE:
      console.log("SEARCH_AUTHORS_FAILURE", action.error);
      return { ...state, isFetchingPubsbyAuthor: false };

    default:
      return state
  }
}
