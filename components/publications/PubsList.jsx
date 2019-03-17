import React from 'react';
import PropTypes from 'prop-types';
import SortedPubs from './SortedPubs';
import FiltersName from './FiltersName';
import { Loading } from '../shared/loading';
import pubType from './PublicationPropTypes';

const PubsList = ({
  selectedGroupName, selectedAuthor, searchIsActive,
  pubsearch, resetAuthor, resetGroup, resetSearch, resetAll, isFetchingPubs,
  pubs, activeTag,
}, { t }) => (
  <div className="container">
    {(selectedGroupName.length > 0
        || selectedAuthor.length > 0
        || (searchIsActive && pubsearch.length) > 0)
        && (
        <div className="columns">
          <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">
            <FiltersName
              selectedGroupName={selectedGroupName}
              selectedAuthor={selectedAuthor}
              pubsearch={searchIsActive && pubsearch}
              resetAuthor={resetAuthor}
              resetGroup={resetGroup}
              resetSearch={resetSearch}
            />
          </div>
        </div>
        )
    }

    {isFetchingPubs && <Loading /> }

    {/* Список публикаций, отсортированный по дате, названию или названию издания */}
    <div className="columns">
      <div className="column is-12-tablet is-8-desktop is-offset-2-desktop ">
        <div className="publications">
          {!isFetchingPubs && (
          <SortedPubs
            pubs={pubs}
            searchRequest={searchIsActive ? pubsearch : ''}
            tag={activeTag}
          />
          )
                                    }
          {/* если нет публикаций */}
          {!isFetchingPubs && pubs.length === 0
            && (
            <div className="no_pubs">
              <p>
                {t('По вашему запросу не найдено ни одной публикации')}
              </p>
                {t('Посмотрите список ')}
              <button onClick={e => resetAll(e)} type="button">
                {t('всех публикаций')}
              </button>
                {t(' или используйте фильтры для выбора публикаций определенного автора или научной группы')}
            </div>
            )
            }
        </div>
      </div>
    </div>
  </div>
);

PubsList.contextTypes = {
  t: PropTypes.func,
};

PubsList.propTypes = {
  selectedGroupName: PropTypes.string.isRequired,
  selectedAuthor: PropTypes.string.isRequired,
  searchIsActive: PropTypes.bool.isRequired,
  pubsearch: PropTypes.string.isRequired,
  resetAuthor: PropTypes.func.isRequired,
  resetGroup: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
  isFetchingPubs: PropTypes.bool.isRequired,
  pubs: PropTypes.arrayOf(pubType).isRequired,
  activeTag: PropTypes.string.isRequired,
};

export default PubsList;
