import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import pubType from './PublicationPropTypes';
import SortedPubs from './SortedPubs';
import { Loading } from '../shared/loading';

function filterPubsbyGroup(pubs, group) {
  return pubs.filter(element => element.data.belongs_to_group
    .map(g => g.sci_group.data.groupname[0].text).includes(group));
}

function filterPubsbyAuthor(pubs, author) {
  return pubs.filter(el => el.data.authors.some(a => a.text === author));
}

const FilterPubs = ({
  selectedGroupName, selectedAuthor, searchRequest, pubs, activeTag, isFetchingPubs,
}) => {
  let filteredPubs = pubs;

  if (selectedGroupName.length > 0) {
    filteredPubs = filterPubsbyGroup(pubs, selectedGroupName);
  } else if (selectedAuthor.length > 0) {
    filteredPubs = filterPubsbyAuthor(pubs, selectedAuthor);
  }
  return (
    <Fragment>

      <div className="columns">
        <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">
          {isFetchingPubs && <Loading /> }
          {/* список публикаций с сортировкой */}
          {!isFetchingPubs
          && (
          <SortedPubs
            pubs={filteredPubs}
            searchRequest={searchRequest}
            tag={activeTag}
          />
          )}
        </div>
      </div>
    </Fragment>
  );
};


FilterPubs.propTypes = {
  pubs: PropTypes.arrayOf(pubType).isRequired,
  selectedGroupName: PropTypes.string.isRequired,
  selectedAuthor: PropTypes.string.isRequired,
  searchRequest: PropTypes.string,
  activeTag: PropTypes.string.isRequired,
  isFetchingPubs: PropTypes.bool.isRequired,
};

FilterPubs.defaultProps = {
  searchRequest: '',
};

export default FilterPubs;
