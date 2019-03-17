import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Publication from './Publication';
import pubType from './PublicationPropTypes';

// STYLES
const Category = styled.h2`
    font-size: 2.2rem;
    line-height: 3rem;
    font-weight: bold;
    margin: 0 0 4rem 0;
    color: #040303;
`;

// вспомогательные функции. Нужны для определения категорий
// и для сравнения публикаций из массива по этим категориям
const getYear = pub => pub.data.date.slice(0, 4);
const getTitleFirstletter = pub => pub.data.title[0].text.slice(0, 1);
const getJournalFirstLetter = pub => pub.data.journal_name[0].text.slice(0, 1);
const getSortingFunction = (tag) => {
  if (tag === 'SORT_DATE') return getYear;
  if (tag === 'SORT_NAME') return getTitleFirstletter;
  return getJournalFirstLetter;
};

// Вспомогательный компонент, в котором перед публикацией идет категория
const PubWithCategory = ({ pub, searchRequest, category }) => (
  <Fragment>
    <Category>
      {category}
    </Category>
    <Publication item={pub} searchRequest={searchRequest} />
  </Fragment>
);

PubWithCategory.propTypes = {
  searchRequest: PropTypes.string,
  category: PropTypes.string.isRequired,
  pub: pubType.isRequired,
};

PubWithCategory.defaultProps = {
  searchRequest: '',
};

// Основной компонент, в котором происходит сортировка pubs
// в зависимости от тэга сортировки tag
const SortedPubs = ({ pubs, searchRequest, tag }) => {
  const sortingFeature = getSortingFunction(tag);
  return (
    <Fragment>
      {pubs.map((pub, index, pubsArr) => {
        if (index === 0) {
          return (
            <PubWithCategory
              pub={pub}
              searchRequest={searchRequest}
              key={pub.id}
              category={sortingFeature(pub)}
            />
          );
        }
        if (sortingFeature(pub) !== sortingFeature(pubsArr[index - 1])) {
          return (
            <PubWithCategory
              pub={pub}
              searchRequest={searchRequest}
              key={pub.id}
              category={sortingFeature(pub)}
            />
          );
        }
        return (
          <Publication
            item={pub}
            searchRequest={searchRequest}
            key={pub.id}
          />
        );
      })}
    </Fragment>
  );
};

// propTypes для основного компонента
SortedPubs.propTypes = {
  searchRequest: PropTypes.string,
  tag: PropTypes.string.isRequired,
  pubs: PropTypes.arrayOf(pubType).isRequired,
};

SortedPubs.defaultProps = {
  searchRequest: '',
};

export default SortedPubs;
