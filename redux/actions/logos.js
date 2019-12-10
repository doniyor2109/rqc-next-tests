import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

const fetchLogosRequest = () => ({ type: actionTypes.FETCH_LOGOS_REQUEST });

export const fetchLogosSuccess = response => ({
  type: actionTypes.FETCH_LOGOS_SUCCESS,
  response,
});

const fetchLogosError = error => ({ type: actionTypes.FETCH_LOGOS_FAILURE, error });

export async function getLogos(lang) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const logoQuery = `{
      logo_page {
        ...logo_pageFields
      }
    }`;
    const response = await api.query(Prismic.Predicates.at('document.type', 'logo_page'),
      {
        graphQuery: logoQuery,
        lang,
      });
    return response;
  } catch (error) {
    return { results: null, error };
  }
}

export const fetchLogos = (language, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchLogosRequest());
    const videoContent = await getLogos(language, pageSize);
    return dispatch(fetchLogosSuccess(videoContent));
  } catch (error) {
    return dispatch(fetchLogosError(error));
  }
};
