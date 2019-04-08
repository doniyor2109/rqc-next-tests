import * as actionTypes from "../actions/actionTypes"

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

    case actionTypes.FETCH_SCI_GROUPS_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.FETCH_SCI_GROUPS_SUCCESS:
      return fetchGroupsSuccess(state, action);

    case actionTypes.FETCH_SCI_GROUPS_FAILURE:
      console.log("FETCH_SCI_GROUPS_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
