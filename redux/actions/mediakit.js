import * as actionTypes from './actionTypes'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration'

// photo
const fetchPhotoGalleriesRequest = () => ({type: actionTypes.FETCH_PHOTO_GALLERIES_REQUEST})
const fetchPhotoGalleriesSuccess = (response) => ({type: actionTypes.FETCH_PHOTO_GALLERIES_SUCCESS, response}) 
const fetchPhotoGalleriesError = (error) => ({type: actionTypes.FETCH_PHOTO_GALLERIES_FAILURE, error})
export const fetchPhotoGalleries= (language, pageSize) => (dispatch) => {
    dispatch(fetchPhotoGalleriesRequest());
    return Prismic.getApi(PrismicConfig.apiEndpoint)
      .then(api => {api.query(Prismic.Predicates.at('document.type', 'mediakit_photo_gallery'),
                                                    { lang: language,
                                                      pageSize: pageSize,
                                                      orderings : '[my.mediakit_photo_gallery.date desc]'})
                        .then(response => dispatch(fetchPhotoGalleriesSuccess(response)))
                        .catch(error => dispatch(fetchPhotoGalleriesError(error)))
            })
  }

// video
const fetchVideoRequest = () => ({type: actionTypes.FETCH_VIDEOS_REQUEST})
const fetchVideoSuccess = (response) => ({type: actionTypes.FETCH_VIDEOS_SUCCESS, response}) 
const fetchVideoError = (error) => ({type: actionTypes.FETCH_VIDEOS_FAILURE, error})
export const fetchVideo = (language, pageSize) => (dispatch) => {
    dispatch(fetchVideoRequest());
    return Prismic.getApi(PrismicConfig.apiEndpoint)
      .then(api => {api.query(Prismic.Predicates.at('document.type', 'mediakit_video'),
                                                    { lang: language, 
                                                      pageSize: pageSize,
                                                      orderings : '[my.mediakit_video.date desc]'})
                        .then(response => dispatch(fetchVideoSuccess(response)))
                        .catch(error => dispatch(fetchVideoError(error)))
            })
  }

// presentations
const fetchPresentationsRequest = () => ({type: actionTypes.FETCH_PRESENTATIONS_REQUEST})
const fetchPresentationsSuccess = (response) => ({type: actionTypes.FETCH_PRESENTATIONS_SUCCESS, response}) 
const fetchPresentationsError = (error) => ({type: actionTypes.FETCH_PRESENTATIONS_FAILURE, error})
export const fetchPresentations = (language, pageSize) => (dispatch) => {
    dispatch(fetchPresentationsRequest());
    return Prismic.getApi(PrismicConfig.apiEndpoint)
      .then(api => {api.query(Prismic.Predicates.at('document.type', 'mediakit_presentation'),
                                                    { lang: language, 
                                                      pageSize: pageSize,
                                                      orderings : '[my.mediakit_presentation.date desc]'})
                        .then(response => dispatch(fetchPresentationsSuccess(response)))
                        .catch(error => dispatch(fetchPresentationsError(error)))
            })
  }
