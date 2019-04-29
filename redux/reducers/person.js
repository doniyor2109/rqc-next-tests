import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  item: [],
};

function fetchPersonSuccess(state, action) {
  const item = action.response[0];
  return { ...state, isFetching: false, item };
}


export const person = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PERSON_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_PERSON_SUCCESS:
      return fetchPersonSuccess(state, action);

    case actionTypes.FETCH_PERSON_FAILURE:
      console.log('FETCH_PERSON_FAILURE', action.error);
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
