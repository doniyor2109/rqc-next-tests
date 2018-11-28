import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  groups: [],
};

function fetchGroupsSuccess(state, action) {
  const groups = action.response.results
  return {...state, isFetching: false, groups}
}


export const scigroups = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_SCI_GROUPS_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_SCI_GROUPS_SUCCESS:
      return fetchGroupsSuccess(state, action);

    case action_types.FETCH_SCI_GROUPS_FAILURE:
      console.log("FETCH_SCI_GROUPS_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
