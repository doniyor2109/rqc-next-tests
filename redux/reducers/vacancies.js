import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetching: false,
  items: [],
  total_pages: 0,
  total_results_size: 0,
  next_page: null,
  prev_page: null
};

function fetchVacanciesSuccess(state, action) {
  const next_page = action.response.next_page
  const prev_page = action.response.prev_page
  const total_results_size = action.response.total_results_size
  const total_pages = action.response.total_pages
  const items = action.response.results
  return {...state, isFetching: false, items, total_pages, total_results_size, next_page, prev_page}
}


export const vacancies = (state = initialState, action) => {
  switch (action.type) {

    case action_types.FETCH_VACANCIES_REQUEST:
      return {...state, isFetching: true };

    case action_types.FETCH_VACANCIES_SUCCESS:
      return fetchVacanciesSuccess(state, action);

    case action_types.FETCH_VACANCIES_FAILURE:
      console.log(action.error);
      return { ...state, isFetching: false };

    default:
      return state
  }
}
