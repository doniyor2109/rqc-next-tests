import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterTag from '../shared/FilterTag';

const FiltersBlock = styled.div`
  .captions {
  color: #040303;
  margin-top: 6.5rem;
  font-size: 1.6rem;
  }
  .tags {
      display: block;
      margin: 3.5rem 0 9rem;
  }
`;

class Filters extends React.Component {
  componentDidMount() {
    const { selectTag, tags } = this.props;
    selectTag(tags[0]);
  }

  componentDidUpdate(prevProps) {
    const { selectTag, tags } = this.props;
    if (tags[0] !== prevProps.tags[0]) {
      selectTag(tags[0]);
    }
  }

  render() {
    const { selectTag, activeTag, tags } = this.props;
    const { t } = this.context;
    return (
      <FiltersBlock>
        <p className="captions">{t('Фильтр по тегам')}</p>
        <div className="tags">
          {tags.map(tag => (
            <FilterTag
              key={tag}
              onClick={(e) => { selectTag(tag, e); }}
              active={activeTag === tag}
            >
              {tag}
            </FilterTag>
          ))}
        </div>
      </FiltersBlock>
    );
  }
}

Filters.propTypes = {
  selectTag: PropTypes.func.isRequired,
  activeTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Filters.contextTypes = {
  t: PropTypes.func,
};

export default Filters;
