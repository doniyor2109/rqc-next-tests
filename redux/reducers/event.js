import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  item: [],
  selectedPost: null,
};

function fetchEventSuccess(state, action) {
  const item = action.response.results[0]
  return { ...state, isFetching: false, item};
}

export const event = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_EVENT_BY_UID_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.FETCH_EVENT_BY_UID_SUCCESS:
      return fetchEventSuccess(state, action);

    case actionTypes.FETCH_EVENT_BY_UID_FAILURE:
      console.log("FETCH_EVENT_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
