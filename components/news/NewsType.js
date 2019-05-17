import PropTypes from 'prop-types';
import articleType from './articleType';

const NewsType = {
  articles: PropTypes.arrayOf(articleType),
  isFetching: PropTypes.string,
  nextPage: PropTypes.string,
  total_pages: PropTypes.number,
  total_results_size: PropTypes.number,
};

export default NewsType;
