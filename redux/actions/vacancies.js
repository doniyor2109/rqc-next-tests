import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

const fetchVacanciesRequest = () => ({type: action_types.FETCH_VACANCIES_REQUEST})

const fetchVacanciesSuccess = (response) => ({type: action_types.FETCH_VACANCIES_SUCCESS, response}) 

const fetchVacanciesError = (error) => ({type: action_types.FETCH_VACANCIES_FAILURE, error})

export const fetchVacancies = (language) => (dispatch) => {
    dispatch(fetchVacanciesRequest());
    return Prismic.getApi(PrismicConfig.apiEndpoint)
      .then(api => {api.query(Prismic.Predicates.at('document.type', 'vacancy'),
                                                    { lang: language})
                        .then(response => dispatch(fetchVacanciesSuccess(response)))
                        .catch(error => dispatch(fetchVacanciesError(error)))
            })
  }

const fetchVacanciesHHRequest = () => ({type: action_types.FETCH_VACANCIESHH_REQUEST})

const fetchVacanciesHHSuccess = (response) => ({type: action_types.FETCH_VACANCIESHH_SUCCESS, response}) 

const fetchVacancieHHError = (error) => ({type: action_types.FETCH_VACANCIESHH_FAILURE, error})

export const fetchVacanciesHH = () => (dispatch) => {
  dispatch(fetchVacanciesHHRequest());
  return fetch('https://api.hh.ru/vacancies?employer_id=1248425', 
                // {
                // headers: {
                // 'Content-Type': 'application/json',
                // }}
                )
                .then(response => response.json())
                .then(formattedResponse => dispatch(fetchVacanciesHHSuccess(formattedResponse)))
                .catch(error => dispatch(fetchVacancieHHError(error)));
}
