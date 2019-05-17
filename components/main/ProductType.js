import PropTypes from 'prop-types';

const productType = {
  big: PropTypes.bool,
  item: PropTypes.shape({
    data: PropTypes.shape({
      url: PropTypes.shape({
        url: PropTypes.string,
      }),
      name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }),
};

export default productType;
