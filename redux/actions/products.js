import * as actionTypes from './actionTypes'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'
// actions for quering API for multiple documents by type

const fetchProductsRequest = () => ({ type: actionTypes.FETCH_PRODUCTS_REQUEST })

const fetchProductsSuccess = (response) => ({ type: actionTypes.FETCH_PRODUCTS_SUCCESS, response })

const fetchProductsFailure = (error) => ({ type: actionTypes.FETCH_PRODUCTS_FAILURE, error })

export const fetchProducts = (language) => (dispatch) => {
  dispatch(fetchProductsRequest());
  return Prismic.getApi(PrismicConfig.apiEndpoint)
    .then(api => {api.query(Prismic.Predicates.at('document.type', 'product'),
                                                  { lang: language,
                                                    orderings : '[my.product.orderings]' })
                      .then(response => dispatch(fetchProductsSuccess(response)))
                      .catch(error => dispatch(fetchProductsFailure(error)))
          })
}
