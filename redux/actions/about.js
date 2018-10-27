import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

export const fetchAboutRequest = () => ({type: action_types.FETCH_ABOUT_REQUEST})

export const fetchAboutSuccess = response => ({type: action_types.FETCH_ABOUT_SUCCESS, response}) 

export const fetchAboutError = error => ({type: action_types.FETCH_ABOUT_FAILURE, error})

export const fetchAbout = language => (dispatch) => {
    dispatch(fetchAboutRequest());
    return Prismic.getApi(PrismicConfig.apiEndpoint)
      .then(api => {api.query(Prismic.Predicates.at('document.type', 'about'),
                                                    { lang: language})
                        .then(response => dispatch(fetchAboutSuccess(response)))
                        .catch(error => dispatch(fetchAboutError(error)))
            })
  }