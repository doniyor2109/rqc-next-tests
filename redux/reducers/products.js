import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  items: [],
  nextPage: null,
};

function fetchProductsSuccess(state, action) {
  const items = action.response.results
  return {...state, isFetching: false, items}
}


export const products = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_PRODUCTS_REQUEST:
      return {...state, isFetching: true };

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);

    case actionTypes.FETCH_PRODUCTS_FAILURE:
      console.log("FETCH_PRODUCTS_FAILURE", action.error);
      return { ...state, isFetching: false };
s
    default:
      return state
  }
}
