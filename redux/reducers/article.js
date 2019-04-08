import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  item: [],
  selectedPost: null,
};

function fetchArticleSuccess(state, action) {
  const item = action.response.results[0]
  return { ...state, isFetching: false, item};
}

export const article = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_ARTICLE_BY_UID_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.FETCH_ARTICLE_BY_UID_SUCCESS:
      return fetchArticleSuccess(state, action);

    case actionTypes.FETCH_ARTICLE_BY_UID_FAILURE:
      console.log("FETCH_ARTICLE_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
