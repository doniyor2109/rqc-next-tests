import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  item: [],
  selectedPost: null,
};

function fetchPostSuccess(state, action) {
  const item = action.response.results[0]
  return { ...state, isFetching: false, item};
}



export const post = (state = initialState, action) => {
  switch (action.type) {
    case action_types.SELECT_POST:
      return { ...state, selectedPost: action.uid };

    case action_types.FETCH_POST_BY_UID_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_POST_BY_UID_SUCCESS:
      return fetchPostSuccess(state, action);

    case action_types.FETCH_POST_BY_UID_FAILURE:
      console.log("FETCH_POST_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
