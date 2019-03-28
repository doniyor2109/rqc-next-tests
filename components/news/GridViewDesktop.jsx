import React from 'react';
import PropTypes from 'prop-types';

import NewscardMedium from './NewscardMedium';
import NewscardSmall from './NewscardSmall';
import Loading from '../shared/loading';

import articleType from './articleType';
// Компонент, отображающий новости в плиточном виде для десктопа

const GridViewDesktop = ({ news, isFetching }) => {
  if (isFetching) return <Loading />;
  return (
    <div className="columns is-multiline">
      {news.map((item, index) => {
        if (index === 0 || index === 9) {
          return <NewscardMedium article={item} key={item.uid} large />;
        } if (index === 1 || index === 2 || index === 3 || index === 4 || index === 8) {
          return <NewscardMedium article={item} key={item.uid} />;
        } if (index === 5 || index === 6 || index === 7) {
          return <NewscardSmall article={item} key={item.uid} />;
        } return <NewscardSmall article={item} key={item.uid} />;
      })}
    </div>
  );
};

GridViewDesktop.propTypes = {
  news: PropTypes.arrayOf(articleType),
  isFetching: PropTypes.bool.isRequired,
};

GridViewDesktop.defaultProps = {
  news: [],
};


export default GridViewDesktop;
