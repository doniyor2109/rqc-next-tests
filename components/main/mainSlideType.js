import PropTypes from 'prop-types';

const mainSlideType = {
  phone: PropTypes.string,
  tablet: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.shape({
    primary: PropTypes.shape({
      button_text_slide: PropTypes.string,
      button_url_slide: PropTypes.shape({
        url: PropTypes.string,
      }),
      description_slide: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      title_slideh1: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      title_slideh2: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      image_slide: PropTypes.shape({
        url: PropTypes.string,
        iphone: PropTypes.shape({
          url: PropTypes.string,
        }),
        ipad: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  })),
};

export default mainSlideType;
