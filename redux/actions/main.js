import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// actions for getting data for Main Slider
const fetchMainSliderRequest = (id) => ({ type: action_types.FETCH_MAIN_SLIDER_REQUEST, id });

const fetchMainSliderSuccess = (id, response) => ({ type: action_types.FETCH_MAIN_SLIDER_SUCCESS, id, response });

const fetchMainSliderFailure = (id, error) => ({ type: action_types.FETCH_MAIN_SLIDER_FAILURE, id, error });

export const fetchMainSlider = (id, language) => (dispatch) => {
  dispatch(fetchMainSliderRequest(id));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.id', id), { lang : language })
                      .then(response => {
                                          dispatch(fetchMainSliderSuccess(id, response));
                                        })
                      .catch(error => dispatch(fetchMainSliderFailure(id, error)))
          })
}

// actions for getting data for Sci Slider
const fetchMainSciSliderRequest = () => ({ type: action_types.FETCH_MAIN_SCI_SLIDER_REQUEST })

const fetchMainSciSliderSuccess = (response) => ({ type: action_types.FETCH_MAIN_SCI_SLIDER_SUCCESS, response })

const fetchMainSciSliderFailure = (error) => ({ type: action_types.FETCH_MAIN_SCI_SLIDER_FAILURE, error })

export const fetchMainSciSlider = (language) => (dispatch) => {
  dispatch(fetchMainSciSliderRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'scientist'),
                                                  { lang: language, fetchLinks : ['science_group.groupname', 'science_group.uid'] })
                      .then(response => dispatch(fetchMainSciSliderSuccess(response)))
                      .catch(error => dispatch(fetchMainSciSliderFailure(error)))
          })
}

// actions for news teaser on main
const fetchNewsForMainRequest = () => ({ type: action_types.FETCH_NEWS_FOR_MAIN_REQUEST })

const fetchNewsForMainSuccess = (response) => ({ type: action_types.FETCH_NEWS_FOR_MAIN_SUCCESS, response })

const fetchNewsForMainFailure = (error) => ({ type: action_types.FETCH_NEWS_FOR_MAIN_FAILURE, error })

export const fetchNewsForMain = (language, size) => (dispatch) => {
  dispatch(fetchNewsForMainRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'news'),
                                                  { lang: language,
                                                    pageSize: size,
                                                    orderings : '[my.news.manual_date_of_publication desc]' })
                      .then(response => dispatch(fetchNewsForMainSuccess(response)))
                      .catch(error => dispatch(fetchNewsForMainFailure(error)))
          })
}
