import * as actionTypes from './actionTypes'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

const morenewsByTagRequest = (id, tag) => ({ type: actionTypes.MORE_NEWS_BY_TAG_REQUEST, id, tag })

const morenewsByTagSuccess = (id, tag, response) => ({ type: actionTypes.MORE_NEWS_BY_TAG_SUCCESS, id, tag, response })

const morenewsByTagFailure = (id, tag, error) => ({ type: actionTypes.MORE_NEWS_BY_TAG_FAILURE, id, tag, error })


// запрос для MORE NEWS
export const morenewsByTag = (id, tag, quantity) => (dispatch) => {
  dispatch(morenewsByTagRequest(id, tag));
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query([Prismic.Predicates.at('document.tags', [tag]),
                             Prismic.Predicates.not('document.id', id)],
                                                  { lang: "*",
                                                    pageSize : quantity,
                                                    orderings : '[my.news.manual_date_of_publication desc]' })

                      .then(response => dispatch(morenewsByTagSuccess(id, tag, response)))
                      .catch(error => dispatch(morenewsByTagFailure(id, tag, error)))
          })
}
