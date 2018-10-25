import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  articles: [],
  total_pages: 0,
  total_results_size: 0,
  nextPage: null,
};

function fetchNewsSuccess(state, action) {
  const nextPage = action.response.next_page
  const total_results_size = action.response.total_results_size
  const total_pages = action.response.total_pages
  const articles = action.response.results
  return {...state, isFetching: false, articles, total_pages, total_results_size, nextPage}
}


export const news = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_NEWS_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_NEWS_SUCCESS:
      return fetchNewsSuccess(state, action);

    case action_types.FETCH_NEWS_FAILURE:
      console.log(action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
