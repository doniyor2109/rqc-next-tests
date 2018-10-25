import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

const fetchPostsByTagRequest = (tag) => ({ type: action_types.FETCH_POSTS_BY_TAG_REQUEST, tag })

const fetchPostsByTagSuccess = (tag, response) => ({ type: action_types.FETCH_POSTS_BY_TAG_SUCCESS, tag, response })

const fetchPostsByTagFailure = (tag, error) => ({ type: action_types.FETCH_POSTS_BY_TAG_FAILURE, tag, error })


// запрос для MORE NEWS
export const fetchPostsByTag = (tag, quantity) => (dispatch) => {
  dispatch(fetchPostsByTagRequest(tag));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.tags', [tag]),
                                                  { lang: "*",
                                                    pageSize : quantity,
                                                    orderings : '[my.news.manual_date_of_publication desc]' })

                      .then(response => dispatch(fetchPostsByTagSuccess(tag, response)))
                      .catch(error => dispatch(fetchPostsByTagFailure(tag, error)))
          })
}
