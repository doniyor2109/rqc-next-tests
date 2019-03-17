import * as action_types from '../actions/action_types.js';

const initialState = {
  isFetchingPubs: false,
  next_page: null,
  pubs: [],
  search: [],
  orderings: '',
};

function fetchPublicationsSuccess(state, action) {
  const pubs = action.response;
  const { next_page } = action.response;
  return {
    ...state, isFetchingPubs: false, pubs, next_page,
  };
}

function searchPubsSuccess(state, action) {
  const search = action.response.results;
  return { ...state, isFetchingPubs: false, search };
}

export const publications = (state = initialState, action) => {
  switch (action.type) {
    case action_types.FETCH_PUBLICATIONS_REQUEST:
      return { ...state, isFetchingPubs: true, orderings: action.orderings };

    case action_types.FETCH_PUBLICATIONS_SUCCESS:
      return fetchPublicationsSuccess(state, action);

    case action_types.FETCH_PUBLICATIONS_FAILURE:
      console.log('FETCH_PUBLICATIONS_FAILURE', action.error);
      return { ...state, isFetchingPubs: false };

    case action_types.SEARCH_PUBLICATIONS_REQUEST:
      return { ...state, isFetchingPubs: true };

    case action_types.SEARCH_PUBLICATIONS_SUCCESS:
      return searchPubsSuccess(state, action);

    case action_types.SEARCH_PUBLICATIONS_FAILURE:
      console.log('SEARCH_PUBLICATIONS_FAILURE', action.error);
      return { ...state, isFetchingPubs: false };
    default:
      return state;
  }
};
