import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  articles: [],
  total_pages: 0,
  total_results_size: 0,
  nextPage: null,
};

function fetchNewsSuccess(state, action) {
  const nextPage = action.response.next_page;
  const articles = action.response.results;
  return {
    ...state, isFetching: false, articles, nextPage,
  };
}


export const news = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_REQUEST:
      return { ...state, isFetching: true };
      s;
    case actionTypes.FETCH_NEWS_SUCCESS:
      return fetchNewsSuccess(state, action);

    case actionTypes.FETCH_NEWS_FAILURE:
      console.log('FETCH_NEWS_FAILURE', action.error);
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
