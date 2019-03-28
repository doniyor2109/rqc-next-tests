import React from 'react';
import PropTypes from 'prop-types';

import NewscardMedium from './NewscardMedium';
import NewscardSmall from './NewscardSmall';
import Loading from '../shared/loading';

import articleType from './articleType';

// Компонент, отображающий новости в плиточном виде для десктопа

const GridViewTablet = ({ news, isFetching }) => {
  if (isFetching) return <Loading />;
  return (
    <div className="columns is-multiline">
      {news.map((item, index) => {
        if (index === 0 || index === 5) {
          return <NewscardMedium article={item} key={item.id} large />;
        } if (index === 1 || index === 2) {
          return <NewscardMedium article={item} key={item.id} />;
        } if (index === 3 || index === 4 || index === 6
          || index === 7 || index === 8 || index === 9) {
          return <NewscardSmall article={item} key={item.id} />;
        } return <NewscardSmall article={item} key={item.id} />;
      })}
    </div>
  );
};

GridViewTablet.propTypes = {
  news: PropTypes.arrayOf(articleType),
  isFetching: PropTypes.bool.isRequired,
};

GridViewTablet.defaultProps = {
  news: [],
};

export default GridViewTablet;
