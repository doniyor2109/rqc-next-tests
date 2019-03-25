import PropTypes from 'prop-types';

const PhotoType = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      description: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      photo_set: PropTypes.arrayOf(PropTypes.shape({
        photo: PropTypes.shape({
          dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
          }),
          url: PropTypes.string,
          photo_title: PropTypes.arrayOf(PropTypes.string),
        }),
      })),
    }),
    uid: PropTypes.string,
  }),
};

export default PhotoType;
