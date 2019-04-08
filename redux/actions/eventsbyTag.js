import * as actionTypes from './actionTypes'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

const fetchEventsByTagRequest = (tag) => ({ type: actionTypes.FETCH_EVENTS_BY_TAG_REQUEST, tag })

const fetchEventsByTagSuccess = (tag, response) => ({ type: actionTypes.FETCH_EVENTS_BY_TAG_SUCCESS, tag, response })

const fetchEventsByTagFailure = (tag, error) => ({ type: actionTypes.FETCH_EVENTS_BY_TAG_FAILURE, tag, error })


// запрос для MORE NEWS
export const fetchEventsByTag = (tag, quantity) => (dispatch) => {
  dispatch(fetchEventsByTagRequest(tag));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query([Prismic.Predicates.at('document.type', 'event'),
                             Prismic.Predicates.at('document.tags', [tag])],
                                                  { lang: "*",
                                                    pageSize : quantity,
                                                    // orderings : '[my.event.manual_date_of_publication desc]' 
                                                  })

                      .then(response => dispatch(fetchEventsByTagSuccess(tag, response)))
                      .catch(error => dispatch(fetchEventsByTagFailure(tag, error)))
          })
}
