import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  page: [],
};

function fetchLogoSuccess(state, action) {
  const page = action.response.results[0];
  return { ...state, isFetching: false, page };
}


export const logos = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LOGOS_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_LOGOS_SUCCESS:
      return fetchLogoSuccess(state, action);

    case actionTypes.FETCH_LOGOS_FAILURE:
      console.log('FETCH_LOGOS_FAILURE', action.error);
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
