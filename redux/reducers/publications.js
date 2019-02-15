import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetchingPubs: false,
  isFetchingPubsbyAuthor: false,
  pubs: [],
  pubsByAuthor: [],
  nextPageAll: null,
  nextPagebyAuthor: null, 
  pubsbyAuthor: []
};

function fetchPublicationsSuccess(state, action) {
  const nextPageAll = action.response.next_page
  const pubs = action.response.results
  return {...state, isFetchingPubs: false, pubs, nextPageAll}
}

function fetchPubsbyAuthorsSuccess(state, action) {
  const nextPagebyAuthor = action.response.next_page
  const pubsByAuthor = action.response.results
  return {...state, isFetchingPubsbyAuthor: false, pubsByAuthor, nextPagebyAuthor}
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

    case action_types.SEARCH_PUBLICATION_BY_AUTHOR_REQUEST:
      return {...state, isFetchingPubsbyAuthor: true };

    case action_types.SEARCH_PUBLICATION_BY_AUTHOR_SUCCESS:
      return fetchPubsbyAuthorsSuccess(state, action);

    case action_types.SEARCH_PUBLICATION_BY_AUTHOR_FAILURE:
      console.log("SEARCH_PUBLICATION_BY_AUTHOR_FAILURE", action.error);
      return { ...state, isFetchingPubsbyAuthor: false };

    default:
      return state
  }
}
