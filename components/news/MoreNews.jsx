/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../shared/loading';

const MoreNews = ({
  nextPage, isFetching, getMoreNews, numberOfMoreNews,
}) => (
  <div className="more-news">
    <div className="columns">
      <div className="column is-centered">
        {isFetching && <Loading />}
        <hr />
        {nextPage
          && (
          <img
            className="more"
            alt="show more news"
            onClick={(e) => { getMoreNews(e, numberOfMoreNews); }}
            src="/static/more.svg"
          />
          ) }
      </div>
    </div>
  </div>
);

MoreNews.propTypes = {
  nextPage: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  getMoreNews: PropTypes.func,
  numberOfMoreNews: PropTypes.number,
};

MoreNews.defaultProps = {
  nextPage: '',
  getMoreNews: () => {},
  numberOfMoreNews: 3,
};

export default MoreNews;
