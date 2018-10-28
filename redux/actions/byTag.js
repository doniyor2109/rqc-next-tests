import * as action_types from './action_types.js'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

const fetchArticlesByTagRequest = (tag) => ({ type: action_types.FETCH_ARTICLES_BY_TAG_REQUEST, tag })

const fetchArticlesByTagSuccess = (tag, response) => ({ type: action_types.FETCH_ARTICLES_BY_TAG_SUCCESS, tag, response })

const fetchArticlesByTagFailure = (tag, error) => ({ type: action_types.FETCH_ARTICLES_BY_TAG_FAILURE, tag, error })


// запрос для MORE NEWS
export const fetchArticlesByTag = (tag, quantity) => (dispatch) => {
  dispatch(fetchArticlesByTagRequest(tag));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.tags', [tag]),
                                                  { lang: "*",
                                                    pageSize : quantity,
                                                    orderings : '[my.news.manual_date_of_publication desc]' })

                      .then(response => dispatch(fetchArticlesByTagSuccess(tag, response)))
                      .catch(error => dispatch(fetchArticlesByTagFailure(tag, error)))
          })
}
