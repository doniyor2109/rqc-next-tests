import * as actionTypes from "../actions/actionTypes"

const initialState = {
    isFetching: false,
    tag: "",
    events: [],
    nextPage: null
};


function fetchEventsByTagSuccess(state, action) {
  const articlesByTag = action.response.results
  const next = action.response.next_page
  return {...state,
          isFetching: false,
                 tag: action.tag,
            events: articlesByTag,
            nextPage: next
          }
}


export const eventsbyTag = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_EVENTS_BY_TAG_REQUEST:
      return {...state, isFetching: true};

    case actionTypes.FETCH_EVENTS_BY_TAG_SUCCESS:
      return fetchEventsByTagSuccess(state, action);

    case actionTypes.FETCH_EVENTS_BY_TAG_FAILURE:
      console.log("FETCH_EVENTS_BY_TAG_FAILURE",action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
