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