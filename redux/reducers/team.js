import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  item: [],
};

function fetchTeamSuccess(state, action) {
  const item = action.response;
  return { ...state, isFetching: false, item };
}


export const team = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEAM_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_TEAM_SUCCESS:
      return fetchTeamSuccess(state, action);

    case actionTypes.FETCH_TEAM_FAILURE:
      console.log('FETCH_TEAM_FAILURE', action.error);
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
