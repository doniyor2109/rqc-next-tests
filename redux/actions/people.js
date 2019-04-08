import * as actionTypes from './actionTypes'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

export const fetchPeopleRequest = () => ({type: actionTypes.FETCH_PEOPLE_REQUEST})

export const fetchPeopleSuccess = (response) => ({type: actionTypes.FETCH_PEOPLE_SUCCESS, response}) 

export const fetchPeopleError = (error) => ({type: actionTypes.FETCH_PEOPLE_FAILURE, error})

export const fetchPeople = (language) => (dispatch) => {
    dispatch(fetchPeopleRequest());
    return Prismic.getApi(PrismicConfig.apiEndpoint)
      .then(api => {api.query(Prismic.Predicates.at('document.type', 'people'),
                                                    { lang: language})
                        .then(response => dispatch(fetchPeopleSuccess(response)))
                        .catch(error => dispatch(fetchPeopleError(error)))
            })
  }