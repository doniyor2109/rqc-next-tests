import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FilterTag from '../shared/FilterTag';

const SortingFilters = ({ selectTag, activeTag }, { t }) => (
  <Fragment>
    <h5 className="sort">
      {t('Сортировать по')}
      :
    </h5>
    <div className="columns">
      <div className="column is-12">
        <FilterTag
          onClick={(e) => { selectTag(e, 'SORT_DATE'); }}
          active={activeTag === 'SORT_DATE'}
        >
          {t('Дате выхода')}
        </FilterTag>
        <FilterTag
          onClick={(e) => { selectTag(e, 'SORT_NAME'); }}
          active={activeTag === 'SORT_NAME'}
        >
          {t('Названию публикации')}
        </FilterTag>
        <FilterTag
          onClick={(e) => { selectTag(e, 'SORT_JOURNAL'); }}
          active={activeTag === 'SORT_JOURNAL'}
        >
          {t('Названию издания')}
        </FilterTag>
      </div>
    </div>
  </Fragment>
);

SortingFilters.propTypes = {
  selectTag: PropTypes.func.isRequired,
  activeTag: PropTypes.string.isRequired,
};

SortingFilters.contextTypes = {
  t: PropTypes.func,
};

export default SortingFilters;
