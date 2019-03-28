import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  events: [],
  total_pages: 0,
  total_results_size: 0,
  nextPage: null,
};

function fetchEventsSuccess(state, action) {
  const nextPage = action.response.next_page
  const total_results_size = action.response.total_results_size
  const total_pages = action.response.total_pages
  const events = action.response.results
  return {...state, isFetching: false, events, total_pages, total_results_size, nextPage}
}


export const events = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_EVENTS_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.FETCH_EVENTS_SUCCESS:
      return fetchEventsSuccess(state, action);

    case actionTypes.FETCH_EVENTS_FAILURE:
      console.log("FETCH_EVENTS_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
