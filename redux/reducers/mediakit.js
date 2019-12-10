import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetchingPhoto: false,
  isFetchingVideo: false,
  isFetchingPresentations: false,
  isFetchingBranding: false,
  photoGalleries: [],
  videos: [],
  presentations: [],
  branding: [],
  photosNextpage: null,
  videosNextpage: null,
  presentationsNextpage: null,
};

function fetchPhotoGalleriesSuccess(state, action) {
  const photoGalleries = action.response.results;
  const photosNextpage = action.response.next_page;
  return {
    ...state, isFetchingPhoto: false, photoGalleries, photosNextpage,
  };
}

function fetchVideoSuccess(state, action) {
  const videos = action.response.results;
  const videosNextpage = action.response.next_page;
  return {
    ...state, isFetchingVideo: false, videos, videosNextpage,
  };
}

function fetchPresentationsSuccess(state, action) {
  const presentations = action.response.results;
  const presentationsNextpage = action.response.next_page;

  return {
    ...state, isFetchingPresentations: false, presentations, presentationsNextpage,
  };
}


export const mediakit = (state = initialState, action) => {
  switch (action.type) {
    // photo
    case actionTypes.FETCH_PHOTO_GALLERIES_REQUEST:
      return { ...state, isFetchingPhoto: true };

    case actionTypes.FETCH_PHOTO_GALLERIES_SUCCESS:
      return fetchPhotoGalleriesSuccess(state, action);

    case actionTypes.FETCH_PHOTO_GALLERIES_FAILURE:
      console.log('FETCH_PHOTO_GALLERIES_FAILURE', action.error);
      return { ...state, isFetchingPhoto: false };

    // video
    case actionTypes.FETCH_VIDEOS_REQUEST:
      return { ...state, isFetchingVideo: true };

    case actionTypes.FETCH_VIDEOS_SUCCESS:
      return fetchVideoSuccess(state, action);

    case actionTypes.FETCH_VIDEOS_FAILURE:
      console.log('FETCH_VIDEO_FAILURE', action.error);
      return { ...state, isFetchingVideo: false };

    // presentations
    case actionTypes.FETCH_PRESENTATIONS_REQUEST:
      return { ...state, isFetchingPresentations: true };

    case actionTypes.FETCH_PRESENTATIONS_SUCCESS:
      return fetchPresentationsSuccess(state, action);

    case actionTypes.FETCH_PRESENTATIONS_FAILURE:
      console.log('FETCH_PRESENTATIONS_FAILURE', action.error);
      return { ...state, isFetchingPresentations: false };

    default:
      return state;
  }
};
