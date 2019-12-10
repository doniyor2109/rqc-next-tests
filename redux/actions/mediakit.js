import Prismic from 'prismic-javascript';
import * as actionTypes from './actionTypes';
import PrismicConfig from '../../prismic-configuration';

// photo
const fetchPhotoGalleriesRequest = () => ({ type: actionTypes.FETCH_PHOTO_GALLERIES_REQUEST });

export const fetchPhotoGalleriesSuccess = response => ({
  type: actionTypes.FETCH_PHOTO_GALLERIES_SUCCESS,
  response,
});

const fetchPhotoGalleriesError = error => ({
  type: actionTypes.FETCH_PHOTO_GALLERIES_FAILURE,
  error,
});

async function getPhotos(lang, pageSize) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const photoQuery = `{
      mediakit_photo_gallery {
        ...mediakit_photo_galleryFields
      }
    }`;
    const response = await api.query(Prismic.Predicates.at('document.type', 'mediakit_photo_gallery'),
      {
        graphQuery: photoQuery,
        pageSize,
        lang,
      });
    return response;
  } catch (error) {
    return { results: null, error };
  }
}

export const fetchPhotoGalleries = (language, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchPhotoGalleriesRequest());
    const photoContent = await getPhotos(language, pageSize);
    return dispatch(fetchPhotoGalleriesSuccess(photoContent));
  } catch (error) {
    return dispatch(fetchPhotoGalleriesError(error));
  }
};

// video
const fetchVideoRequest = () => ({ type: actionTypes.FETCH_VIDEOS_REQUEST });

const fetchVideoSuccess = response => ({ type: actionTypes.FETCH_VIDEOS_SUCCESS, response });

const fetchVideoError = error => ({ type: actionTypes.FETCH_VIDEOS_FAILURE, error });

async function getVideos(lang, pageSize) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const videoQuery = `{
      mediakit_video {
        ...mediakit_videoFields
      }
    }`;
    const response = await api.query(Prismic.Predicates.at('document.type', 'mediakit_video'),
      {
        graphQuery: videoQuery,
        pageSize,
        lang,
      });
    return response;
  } catch (error) {
    return { results: null, error };
  }
}

export const fetchVideo = (language, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchVideoRequest());
    const videoContent = await getVideos(language, pageSize);
    return dispatch(fetchVideoSuccess(videoContent));
  } catch (error) {
    return dispatch(fetchVideoError(error));
  }
};

// presentations
const fetchPresentationsRequest = () => ({ type: actionTypes.FETCH_PRESENTATIONS_REQUEST });

export const fetchPresentationsSuccess = response => ({
  type: actionTypes.FETCH_PRESENTATIONS_SUCCESS,
  response,
});

const fetchPresentationsError = error => ({ type: actionTypes.FETCH_PRESENTATIONS_FAILURE, error });

async function getPresentations(lang, pageSize) {
  try {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    const presQuery = `{
      mediakit_presentation {
        ...mediakit_presentationFields
      }
    }`;
    const response = await api.query(Prismic.Predicates.at('document.type', 'mediakit_presentation'),
      {
        graphQuery: presQuery,
        pageSize,
        lang,
      });
    return response;
  } catch (error) {
    return { results: null, error };
  }
}

export const fetchPresentations = (language, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchPresentationsRequest());
    const videoContent = await getPresentations(language, pageSize);
    return dispatch(fetchPresentationsSuccess(videoContent));
  } catch (error) {
    return dispatch(fetchPresentationsError(error));
  }
};
