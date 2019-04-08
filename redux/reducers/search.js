import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  text: '',
  results: [],
  total_results_size: 0,
  nextPage: null,
};

function SearchSuccess(state, action) {
  const nextPage = action.response.next_page
  const total_results_size = action.response.total_results_size
  const results = action.response.results
  const text = action.text
  return {...state, isFetching: false, results, total_results_size, nextPage, text}
}


export const search = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SEARCH_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.SEARCH_SUCCESS:
      return SearchSuccess(state, action);

    case actionTypes.SEARCH_FAILURE:
      console.log(action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
