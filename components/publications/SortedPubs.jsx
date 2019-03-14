import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Publication from './Publication';

// STYLES

const Category = styled.h2`
    font-size: 2.2rem;
    line-height: 3rem;
    font-weight: bold;
    margin: 0 0 4rem 0;
    color: #040303;
`;

const getYear = pub => pub.data.date.slice(0, 4);
const getTitleFirstletter = pub => pub.data.title[0].text.slice(0, 1);
const getJournalFirstLetter = pub => pub.data.journal_name[0].text.slice(0, 1);
const getSortingFunction = (tag) => {
  if (tag === 'SORT_DATE') return getYear;
  if (tag === 'SORT_NAME') return getTitleFirstletter;
  return getJournalFirstLetter;
};

const PubWithCategory = ({ pub, search, category }) => (
  <Fragment>
    <Category>
      {category}
    </Category>
    <Publication item={pub} searchText={search} />
  </Fragment>
);

const pubType = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value === 'object' && value.type === 'publication') {
    return null;
  }
  return new TypeError(`Invalid Publication Prop Value: ${value} for ${propName} in ${componentName}`);
};

PubWithCategory.propTypes = {
  search: PropTypes.string,
  category: PropTypes.string.isRequired,
  pub: pubType.isRequired,
};

PubWithCategory.defaultProps = {
  search: '',
};


const SortedPubs = ({ pubs, search, tag }) => {
  const sortingFeature = getSortingFunction(tag);
  return (
    <Fragment>
      {pubs.map((pub, index, pubsArr) => {
        if (index === 0) {
          return (
            <PubWithCategory
              pub={pub}
              search={search}
              key={pub.id}
              category={sortingFeature(pub)}
            />
          );
        }
        if (sortingFeature(pub) !== sortingFeature(pubsArr[index - 1])) {
          return (
            <PubWithCategory
              pub={pub}
              search={search}
              key={pub.id}
              category={sortingFeature(pub)}
            />
          );
        }
        return (
          <Publication
            item={pub}
            searchText={search}
            key={pub.id}
          />
        );
      })}
    </Fragment>
  );
};


SortedPubs.propTypes = {
  search: PropTypes.string,
  tag: PropTypes.string.isRequired,
  pubs: PropTypes.arrayOf(pubType).isRequired,
};

SortedPubs.defaultProps = {
  search: '',
};

export default SortedPubs;
