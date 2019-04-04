import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  items: [],
};

function fetchEducationSuccess(state, action) {
  const items = action.response.results[0];
  return {
    ...state, isFetching: false, items,
  };
}


export const education = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EDUCATION_REQUEST:
      return { ...state, isFetching: true };
      s;
    case actionTypes.FETCH_EDUCATION_SUCCESS:
      return fetchEducationSuccess(state, action);

    case actionTypes.FETCH_EDUCATION_FAILURE:
      console.log('FETCH_EDUCATION_FAILURE', action.error);
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
