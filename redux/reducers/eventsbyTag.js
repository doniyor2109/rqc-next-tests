import * as action_types from "../actions/action_types.js"

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

    case action_types.FETCH_EVENTS_BY_TAG_REQUEST:
      return {...state, isFetching: true};

    case action_types.FETCH_EVENTS_BY_TAG_SUCCESS:
      return fetchEventsByTagSuccess(state, action);

    case action_types.FETCH_EVENTS_BY_TAG_FAILURE:
      console.log("FETCH_EVENTS_BY_TAG_FAILURE",action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
