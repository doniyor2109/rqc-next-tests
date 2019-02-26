import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetchingPubs: false,
  isFetchingPubsbyScienceGroup: false,
  next_page: null,
  pubs: [],
  pubsByGroup: []
};

function fetchPublicationsSuccess(state, action) {
  // const response = action.response
  // console.log("reducer response", response)
  // var pubs = state.pubs
  // if (response.page === 1) {
  //   pubs = action.response.results
  // } else {
  //   pubs = state.pubs.concat(action.response.results)
  // }
  const pubs = action.response
  const next_page = action.response.next_page
  return {...state, isFetchingPubs: false, pubs, next_page}
}
function fetchPubsbyScienceGroupSuccess(state, action) {
  const nextPagebyGroup = action.response.next_page
  const pubsByGroup = action.response.results
  return {...state, isFetchingPubsbyScienceGroup: false, pubsByGroup, nextPagebyGroup}
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

    case action_types.SEARCH_PUBLICATION_BY_SCIENCE_GROUP_REQUEST:
      return {...state, isFetchingPubsbyScienceGroup: true };

    case action_types.SEARCH_PUBLICATION_BY_SCIENCE_GROUP_SUCCESS:
      return fetchPubsbyScienceGroupSuccess(state, action);

    case action_types.SEARCH_PUBLICATION_BY_SCIENCE_GROUP_FAILURE:
      console.log("SEARCH_PUBLICATION_BY_SCIENCE_GROUP_FAILURE", action.error);
      return { ...state, isFetchingPubsbyScienceGroup: false };
    default:
      return state
  }
}
