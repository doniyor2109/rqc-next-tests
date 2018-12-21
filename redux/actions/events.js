import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchEventsRequest = () => ({ type: action_types.FETCH_EVENTS_REQUEST })

const fetchEventsSuccess = (response) => ({ type: action_types.FETCH_EVENTS_SUCCESS, response })

const fetchEventsFailure = (error) => ({ type: action_types.FETCH_EVENTS_FAILURE, error })

export const fetchEvents = (language, pageSize) => (dispatch) => {
  dispatch(fetchEventsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'event'),
                                                  { lang: language,
                                                    pageSize: pageSize,
                                                    // orderings : '[my.event.manual_date_of_publication desc]' 
                                                  })
                      .then(response => dispatch(fetchEventsSuccess(response)))
                      .catch(error => dispatch(fetchEventsFailure(error)))
          })
}
