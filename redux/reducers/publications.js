import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetchingPubs: false,
  pubs: [],
};

function fetchPublicationsSuccess(state, action) {
  const pubs = action.response;
  return { ...state, isFetchingPubs: false, pubs };
}

export const publications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PUBLICATIONS_REQUEST:
      return { ...state, isFetchingPubs: true };

    case actionTypes.FETCH_PUBLICATIONS_SUCCESS:
      return fetchPublicationsSuccess(state, action);

    case actionTypes.FETCH_PUBLICATIONS_FAILURE:
      console.log('FETCH_PUBLICATIONS_FAILURE', action.error);
      return { ...state, isFetchingPubs: false };

    default:
      return state;
  }
};
