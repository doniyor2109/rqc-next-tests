import * as actionTypes from "../actions/actionTypes"

const initialState = {
    isFetching: false,
    tag: "",
    articles: [],
    nextPage: null
};


function morenewsbyTagSuccess(state, action) {
  const articlesByTag = action.response.results
  const next = action.response.next_page
  return {...state,
          isFetching: false,
                 tag: action.tag,
            articles: articlesByTag,
            nextPage: next
          }
}


export const related = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.MORE_NEWS_BY_TAG_REQUEST:
      return {...state, isFetching: true};

    case actionTypes.MORE_NEWS_BY_TAG_SUCCESS:
      return morenewsbyTagSuccess(state, action);

    case actionTypes.MORE_NEWS_BY_TAG_FAILURE:
      console.log(action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
