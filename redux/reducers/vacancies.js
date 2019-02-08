import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  items: [],
  itemsHH: []
};

function fetchVacanciesSuccess(state, action) {
  const items = action.response.results
  return {...state, isFetching: false, items}
}

function fetchVacanciesHHSuccess(state, action) {
  const itemsHH = action.response
  return {...state, isFetching: false, itemsHH}
}

export const vacancies = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_VACANCIES_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_VACANCIES_SUCCESS:
      return fetchVacanciesSuccess(state, action);

    case action_types.FETCH_VACANCIES_FAILURE:
      console.log("FETCH_VACANCIES_FAILURE", action.error);
      return { ...state, isFetching: false };
    
    case action_types.FETCH_VACANCIESHH_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_VACANCIESHH_SUCCESS:
      return fetchVacanciesHHSuccess(state, action);

    case action_types.FETCH_VACANCIESHH_FAILURE:
      console.log("FETCH_VACANCIESHH_FAILURE", action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
