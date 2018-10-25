import * as action_types from "../actions/action_types.js"

const initialState = {
    isFetching: false,
    tag: "",
    articles: [],
    nextPage: null
};


function fetchPostsByTagSuccess(state, action) {
  const articlesByTag = action.response.results
  const next = action.response.next_page
  return {...state,
          isFetching: false,
                 tag: action.tag,
            articles: articlesByTag,
            nextPage: next
          }
}


export const byTag = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_POSTS_BY_TAG_REQUEST:
      return {...state, isFetching: true};

    case action_types.FETCH_POSTS_BY_TAG_SUCCESS:
      return fetchPostsByTagSuccess(state, action);

    case action_types.FETCH_POSTS_BY_TAG_FAILURE:
      console.log(action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
