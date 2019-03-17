/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilterTag = styled.div`
  margin-bottom:3rem;
  @media (max-width: 768px) {
    width: 113%;
  }
  .description {
    font-size: 1.4rem;
    line-height: 3rem;
    margin-right: 1rem;
  }
  .filter-name {
      font-size: 2.2rem;
      line-height: 3rem;
      font-weight: bold;
      color:#040303;
  }
  img {
      margin-right: 2.6rem;
      top: -1rem;
      position: relative;
  }
  button {
    border:0;
  }
`;

const FiltersName = ({
  selectedGroupName,
  selectedAuthor,
  pubsearch,
  resetAuthor,
  resetGroup,
  resetSearch,
}, { t }) => (
  <div className="filters">
    {pubsearch
      ? (
        <FilterTag>
          <span className="description">
            {t('Результаты по запросу')}
              :
          </span>
          <span className="filter-name">
            {pubsearch}
          </span>
          <button type="button" onClick={(e) => { resetSearch(e); }}>
            <img src="/static/resetFilers.svg" alt="reset filters" />
          </button>
        </FilterTag>
      )
      : (
        <FilterTag>
          {selectedGroupName
              && (
              <Fragment>
                <span className="filter-name">
                  {selectedGroupName}
                </span>
                <button type="button" onClick={(e) => { resetGroup(e); }}>
                  <img src="/static/resetFilers.svg" alt="reset filters" />
                </button>
              </Fragment>
              )
          }
          {selectedAuthor
              && (
              <Fragment>
                <span className="filter-name">
                  {selectedAuthor}
                </span>
                <button type="button" onClick={(e) => { resetAuthor(e); }}>
                  <img src="/static/resetFilers.svg" alt="reset filters" />
                </button>
              </Fragment>
              )
          }
        </FilterTag>
      )
    }
  </div>
);

FiltersName.contextTypes = {
  t: PropTypes.func,
};

FiltersName.propTypes = {
  selectedGroupName: PropTypes.string,
  selectedAuthor: PropTypes.string,
  pubsearch: PropTypes.string,
  resetAuthor: PropTypes.func.isRequired,
  resetGroup: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
};

FiltersName.defaultProps = {
  selectedGroupName: '',
  selectedAuthor: '',
  pubsearch: '',
};


export default FiltersName;
