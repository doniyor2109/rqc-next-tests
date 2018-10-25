import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

const fetchLogoRequest = () => ({type: action_types.FETCH_LOGO_REQUEST})

const fetchLogoSuccess = (response) => ({type: action_types.FETCH_LOGO_SUCCESS, response}) 

const fetchLogoError = (error) => ({type: action_types.FETCH_LOGO_FAILURE, error})

export const fetchLogo = (language) => (dispatch) => {
    dispatch(fetchLogoRequest());
    return Prismic.getApi(PrismicConfig.apiEndpoint)
      .then(api => {api.query(Prismic.Predicates.at('document.type', 'logo'),
                                                    { lang: language})
                        .then(response => dispatch(fetchLogoSuccess(response)))
                        .catch(error => dispatch(fetchLogoError(error)))
            })
  }