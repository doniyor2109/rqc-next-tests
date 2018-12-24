import * as action_types from "../actions/action_types.js"

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

    case action_types.SEARCH_REQUEST:
      return {...state, isFetching: true };

    case action_types.SEARCH_SUCCESS:
      return SearchSuccess(state, action);

    case action_types.SEARCH_FAILURE:
      console.log(action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
