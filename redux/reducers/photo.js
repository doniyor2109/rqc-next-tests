import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  item: [],
};

function fetchPhotoSuccess(state, action) {
  const item = action.response.results[0]
  return { ...state, isFetching: false, item};
}



export const photo = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_PHOTO_BY_UID_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_PHOTO_BY_UID_SUCCESS:
      return fetchPhotoSuccess(state, action);

    case action_types.FETCH_PHOTO_BY_UID_FAILURE:
      console.log("FETCH_PHOTO_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
