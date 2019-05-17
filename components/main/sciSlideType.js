import PropTypes from 'prop-types';

const sciSlideType = PropTypes.shape({
  iphone: PropTypes.bool,
  ipad: PropTypes.bool,
  desktop: PropTypes.bool,
  slides: PropTypes.shape({
    data: PropTypes.shape({
      position: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      photo: PropTypes.shape({
        url: PropTypes.string,
      }),
      science_group: PropTypes.shape({
        data: PropTypes.shape({
          groupname: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
          })),
        }),
        uid: PropTypes.string,
      }),
    }),
  }),
});

export default sciSlideType;
