import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  page: {}
};

function fetchAboutSuccess(state, action) {
  const page = action.response.results[0]
  return { ...state, isFetching: false, page};
}



export const about = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_ABOUT_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.FETCH_ABOUT_SUCCESS:
      return fetchAboutSuccess(state, action);

    case actionTypes.FETCH_ABOUT_FAILURE:
      console.log("FETCH_ABOUT_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
