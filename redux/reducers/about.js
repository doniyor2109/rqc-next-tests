import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  page: {}
};

function fetchAboutSuccess(state, action) {
  const page = action.response.results[0]
  console.log("about page received!", action.language)
  return { ...state, isFetching: false, page};
}



export const about = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_ABOUT_REQUEST:
      console.log("about request!!")
      return {...state, isFetching: true };

    case action_types.FETCH_ABOUT_SUCCESS:
      return fetchAboutSuccess(state, action);

    case action_types.FETCH_ABOUT_FAILURE:
      console.log("FETCH_ABOUT_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
