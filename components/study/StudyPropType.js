import PropTypes from 'prop-types';

const StudyType = {
  items: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({
      author: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      description: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      schedule: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        file: PropTypes.shape({
          url: PropTypes.string,
        }),
        lecture: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      })),
    }),
  })),
};

export default StudyType;
