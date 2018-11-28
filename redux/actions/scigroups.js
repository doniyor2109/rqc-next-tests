import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

const fetchSciGroupsRequest = () => ({ type: action_types.FETCH_SCI_GROUPS_REQUEST })

const fetchSciGroupsSuccess = (response) => ({ type: action_types.FETCH_SCI_GROUPS_SUCCESS, response })

const fetchSciGroupsFailure = (error) => ({ type: action_types.FETCH_SCI_GROUPS_FAILURE, error })

export const fetchSciGroups = (language) => (dispatch) => {
  dispatch(fetchSciGroupsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'science_group'),
                                                  { lang: language})
                      .then(response => dispatch(fetchSciGroupsSuccess(response)))
                      .catch(error => dispatch(fetchSciGroupsFailure(error)))
          })
}
