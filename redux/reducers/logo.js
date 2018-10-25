import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  item: {}
};

function fetchLogoSuccess(state, action) {
  const item = action.response.results[0]
  return { ...state, isFetching: false, item};
}



export const logo = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_LOGO_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_LOGO_SUCCESS:
      return fetchLogoSuccess(state, action);

    case action_types.FETCH_LOGO_FAILURE:
      console.log("FETCH_LOGO_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
