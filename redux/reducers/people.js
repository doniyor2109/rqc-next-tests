import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  page: []
};

function fetchPeopleSuccess(state, action) {
  const page = action.response;
  return { ...state, isFetching: false, page};
}



export const people = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_PEOPLE_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_PEOPLE_SUCCESS:
      return fetchPeopleSuccess(state, action);

    case action_types.FETCH_PEOPLE_FAILURE:
      console.log("FETCH_PEOPLE_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
