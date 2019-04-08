import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isFetchingPrismic: false,
  isFetchingManyHH: false,
  isFetchingOneHH: false,
  items: [],
  itemsHH: [], 
  vacanciesbyID: []
};

function fetchVacanciesSuccess(state, action) {
  const items = action.response.results
  return {...state, isFetchingPrismic: false, items}
}

function fetchVacanciesHHSuccess(state, action) {
  const itemsHH = action.response.items
  return {...state, isFetchingManyHH: false, itemsHH}
}

function fetchVacancyHHSuccess(state, action) {

  return {...state, 
    isFetchingOneHH: false, 
    vacanciesbyID: [...state.vacanciesbyID, action.response]}
}

export const vacancies = (state = initialState, action) => {
  switch (action.type) {

    // вакансии с призмика
    case actionTypes.FETCH_VACANCIES_REQUEST:
      return {...state, isFetchingPrismic: true };

    case actionTypes.FETCH_VACANCIES_SUCCESS:
      return fetchVacanciesSuccess(state, action);

    case actionTypes.FETCH_VACANCIES_FAILURE:
      console.log("FETCH_VACANCIES_FAILURE", action.error);
      return { ...state, isFetchingPrismic: false };


    // список вакансии с HH
    case actionTypes.FETCH_VACANCIESHH_REQUEST:
      return {...state, isFetchingManyHH: true };

    case actionTypes.FETCH_VACANCIESHH_SUCCESS:
      return fetchVacanciesHHSuccess(state, action);

    case actionTypes.FETCH_VACANCIESHH_FAILURE:
      console.log("FETCH_VACANCIESHH_FAILURE", action.error);
      return { ...state, isFetchingManyHH: false };

    // одна вакансия с HH
    case actionTypes.FETCH_VACANCYHH_REQUEST:
      return {...state, isFetchingOneHH: true };

    case actionTypes.FETCH_VACANCYHH_SUCCESS:
      return fetchVacancyHHSuccess(state, action);

    case actionTypes.FETCH_VACANCYHH_FAILURE:
      console.log("FETCH_VACANCYHH_FAILURE", action.error);
      return { ...state, isFetchingOneHH: false };

    default:
      return state
  }
}
