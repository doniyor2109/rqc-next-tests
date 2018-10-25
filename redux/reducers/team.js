import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  item: []
};

function fetchTeamSuccess(state, action) {
  const item = action.response.results[0]
  return { ...state, isFetching: false, item};
}



export const team = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_TEAM_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_TEAM_SUCCESS:
      return fetchTeamSuccess(state, action);

    case action_types.FETCH_TEAM_FAILURE:
      console.log("FETCH_TEAM_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
