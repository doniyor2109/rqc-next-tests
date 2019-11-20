import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  items: [],
};

function fetchStudySuccess(state, action) {
  const items = action.response;
  return { ...state, isFetching: false, items };
}


export const study = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STUDY_MATERIALS_REQUEST:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_STUDY_MATERIALS_SUCCESS:
      return fetchStudySuccess(state, action);

    case actionTypes.FETCH_STUDY_MATERIALS_FAILURE:
      console.log('FETCH_STUDY_MATERIALS_FAILURE', action.error);
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
