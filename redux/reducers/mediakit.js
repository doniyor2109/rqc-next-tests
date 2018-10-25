import * as action_types from "../actions/action_types.js"

const initialState = {
  isFetchingPhoto: false,
  isFetchingVideo: false,
  isFetchingPresentations: false,
  isFetchingBranding: false,
  photo_galleries: [],
  videos: [],
  presentations: [],
  branding: [], 
  photosNextpage: null, 
  videosNextpage: null, 
  presentationsNextpage: null, 
};

function fetchPhotoGalleriesSuccess(state, action) {
  const photo_galleries = action.response.results
  const photosNextpage = action.response.next_page
  return { ...state, isFetchingPhoto: false, photo_galleries, photosNextpage}
}

function fetchVideoSuccess(state, action) {
  const videos = action.response.results
  const videosNextpage = action.response.next_page
  return { ...state, isFetchingVideo: false, videos, videosNextpage}
}

function fetchPresentationsSuccess(state, action) {
  const presentations = action.response.results
  const presentationsNextpage = action.response.next_page

  return { ...state, isFetchingPresentations: false, presentations, presentationsNextpage}
}

function fetchBrandingSuccess(state, action) {
  const branding = action.response.results
  return { ...state, isFetchingBranding: false, branding}
}


export const mediakit = (state = initialState, action) => {
  switch (action.type) {

    //photo
    case action_types.FETCH_PHOTO_GALLERIES_REQUEST:
      return {...state, isFetchingPhoto: true };

    case action_types.FETCH_PHOTO_GALLERIES_SUCCESS:
      return fetchPhotoGalleriesSuccess(state, action);

    case action_types.FETCH_PHOTO_GALLERIES_FAILURE:
      console.log("FETCH_PHOTO_GALLERIES_FAILURE", action.error);
      return { ...state, isFetchingPhoto: false };
    
    //video
    case action_types.FETCH_VIDEOS_REQUEST:
      return {...state, isFetchingVideo: true };

    case action_types.FETCH_VIDEOS_SUCCESS:
      return fetchVideoSuccess(state, action);

    case action_types.FETCH_VIDEOS_FAILURE:
      console.log("FETCH_VIDEO_FAILURE", action.error);
      return { ...state, isFetchingVideo: false };

    //presentations
    case action_types.FETCH_PRESENTATIONS_REQUEST:
      return {...state, isFetchingPresentations: true };

    case action_types.FETCH_PRESENTATIONS_SUCCESS:
      return fetchPresentationsSuccess(state, action);

    case action_types.FETCH_PRESENTATIONS_FAILURE:
      console.log("FETCH_PRESENTATIONS_FAILURE", action.error);
      return { ...state, isFetchingPresentations: false };

    //branding
    case action_types.FETCH_BRANDING_REQUEST:
      return {...state, isFetchingBranding: true };

    case action_types.FETCH_BRANDING_SUCCESS:
      return fetchBrandingSuccess(state, action);

    case action_types.FETCH_BRANDING_FAILURE:
      console.log("FETCH_PRESENTATIONS_FAILURE", action.error);
      return { ...state, isFetchingBranding: false };
      
    default:
      return state
  }
}
