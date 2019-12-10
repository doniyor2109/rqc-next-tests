/* eslint-disable camelcase */
// core modules
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// actions
import * as mediakitActions from '../redux/actions/mediakit';
import * as langActions from '../redux/actions/lang';

// components
import MediaKitMainComponent from '../components/mediakit';

const Mediakit = ({
  phone, tablet, mediakit, fetchPhotoGalleries, fetchVideo, fetchPresentations, lang, fb_locale,
}) => {
  const {
    photoGalleries, videos, presentations, isFetchingPhoto, isFetchingVideo,
    isFetchingPresentations, videosNextpage, photosNextpage, presentationsNextpage,
  } = mediakit;

  return (
    <MediaKitMainComponent
      photos={photoGalleries}
      videos={videos}
      presentations={presentations}
      isFetchingPhoto={isFetchingPhoto}
      isFetchingVideo={isFetchingVideo}
      isFetchingPresentations={isFetchingPresentations}
      fetchPhotoGalleries={fetchPhotoGalleries}
      fetchVideo={fetchVideo}
      fetchPresentations={fetchPresentations}
      photosNextpage={photosNextpage}
      videosNextpage={videosNextpage}
      presentationsNextpage={presentationsNextpage}
      lang={lang}
      phone={phone}
      tablet={tablet}
      fb_locale={fb_locale}
    />
  );
};


Mediakit.propTypes = {
  fb_locale: PropTypes.string,
  mediakit: PropTypes.shape({
    photoGalleries: PropTypes.arrayOf(PropTypes.shape({
      uid: PropTypes.string,
      data: PropTypes.shape({
        photo_set: PropTypes.arrayOf(PropTypes.shape({
          photo: PropTypes.shape({
            thumbnail: PropTypes.shape({
              url: PropTypes.string,
            }),
            alt: PropTypes.string,
          }),
        })),
        title: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      }),
    })),
    videos: PropTypes.arrayOf(PropTypes.shape({
      uid: PropTypes.string,
      data: PropTypes.shape({
        youtube_link: PropTypes.shape({
          html: PropTypes.string,
        }),
        title: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      }),
    })),
    presentations: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.shape({
        presentation_link: PropTypes.string,
        title: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        author_name: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        thumbnail: PropTypes.shape({
          url: PropTypes.string,
          alt: PropTypes.string,
        }),
      }),
    })),
    isFetchingPhoto: PropTypes.bool,
    isFetchingVideo: PropTypes.bool,
    isFetchingPresentations: PropTypes.bool,
    photosNextpage: PropTypes.string,
    videosNextpage: PropTypes.string,
    presentationsNextpage: PropTypes.string,
  }),
  fetchPhotoGalleries: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  fetchPresentations: PropTypes.func.isRequired,
  lang: PropTypes.string,
  phone: PropTypes.string,
  tablet: PropTypes.string,
};

Mediakit.defaultProps = {
  fb_locale: 'ru_RU',
  lang: 'ru',
  phone: null,
  tablet: null,
  mediakit: {
    photoGalleries: [],
    videos: [],
    presentations: [],
    isFetchingPhoto: false,
    isFetchingVideo: false,
    isFetchingPresentations: false,
    photosNextpage: null,
    videosNextpage: null,
    presentationsNextpage: null,
  },
};


Mediakit.contextTypes = {
  t: PropTypes.func,
};


const mapStateToProps = (state) => {
  const { mediakit } = state;
  const { lang } = state.i18nState;
  return { mediakit, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  mediakitActions,
  langActions), dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Mediakit);
