import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  page: {}
};

function fetchPageSuccess(state, action) {
  const page = action.response.results[0]
  return { ...state, isFetching: false, page};
}



export const research = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_RESEARCH_PAGE_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.FETCH_RESEARCH_PAGE_SUCCESS:
      return fetchPageSuccess(state, action);

    case actionTypes.FETCH_RESEARCH_PAGE_FAILURE:
      console.log("FETCH_RESEARCH_PAGE_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
