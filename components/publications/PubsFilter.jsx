import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import memoize from 'memoize-one';

import FilterTag from '../shared/FilterTag';
import PubsList from './PubsList';
import pubType from './PublicationPropTypes';

import { uniqArray } from './helpers';

class PubsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAuthor: '',
      selectedGroupName: '',
    };
    this.handleGroupSelect = this.handleGroupSelect.bind(this);
    this.handleAuthorsSelect = this.handleAuthorsSelect.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.resetGroup = this.resetGroup.bind(this);
    this.resetAuthor = this.resetAuthor.bind(this);
    this.filterPubsbyGroup = this.filterPubsbyGroup.bind(this);
    const arrayofAuthorswithDuplicates = props.pubs.map(pub => pub.data.authors
      .map(author => author.text))
      .reduce((acc, val) => acc.concat(val));
    this.authors = uniqArray(arrayofAuthorswithDuplicates);
  }

  filterPubsbyGroup(group) {
    const { pubs } = this.props;
    return pubs.filter(element => element.data.belongs_to_group
      .map(g => g.sci_group.data.groupname[0].text).includes(group));
  }

  // обработка селекта научных групп
  handleGroupSelect(group) {
    const { resetSearch } = this.props;
    this.resetAuthor();
    resetSearch();
    this.setState({
      selectedGroupName: group.value,
    });
  }

  // обработка селекта авторов
  handleAuthorsSelect(author) {
    console.log('author selected');
    const { resetSearch } = this.props;
    this.resetGroup();
    resetSearch();
    this.setState({
      selectedAuthor: author.value,
    });
  }

  // сброс всех селектов и поиска
  resetAll(e) {
    const { resetSearch } = this.props;
    this.resetGroup(e);
    this.resetAuthor(e);
    resetSearch(e);
  }

  // cброс селекта научной группы
  resetGroup(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      selectedGroupName: '',
    });
    if (this.groupSelect.state.value !== null) {
      this.groupSelect.state.value = null;
    }
  }

  // сброс селекта авторов
  resetAuthor(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      selectedAuthor: '',
    });
    if (this.authorSelect.state.value !== null) {
      this.authorSelect.state.value = null;
    }
  }


  render() {
    const { t } = this.context;
    const {
      isFetchingGroups, isFetchingPubs, searchPubs, selectTag, activeTag,
      pubsearch, searchIsActive, searchChange, resetSearch, groups, lang, pubs, searchSubmit
    } = this.props;
    const { selectedGroupName, selectedAuthor } = this.state;

    let filteredPubs = pubs;
    if (selectedGroupName.length > 0) {
      filteredPubs = this.filterPubsbyGroup(selectedGroupName);
    } else if (selectedAuthor.length > 0) {
      filteredPubs = pubs.filter(el => el.data.authors.some(a => a.text === selectedAuthor));
    }
    const filteredGroups = groups.filter(el => el.lang === lang)
      .map(group => group.data.groupname[0].text);
    return (
      <Fragment>
        <section className="settings">
          <div className="container">
            <h5>
              {t('Фильтры и поиск')}
                :
            </h5>
            <div className="columns is-multiline">
              <div className="column is-7-desktop is-7-tablet is-12-mobile">
                <div className="columns is-multiline">
                  <div className="column is-7-desktop is-12-tablet">
                    <div className="select_wrapper">
                      <p className="name">
                        {t('Научная группа')}
                        :
                      </p>
                      <Select
                        onChange={this.handleGroupSelect}
                        options={filteredGroups.map(
                          group => ({ label: group, value: group }),
                        )}
                        instanceId="groupselect"
                        className="group-select-container"
                        classNamePrefix="select"
                        placeholder={t('Введите название')}
                        isLoading={isFetchingGroups}
                        isDisabled={isFetchingGroups}
                        ref={c => (this.groupSelect = c)}
                      />
                    </div>
                  </div>
                  <div className="column is-5-desktop is-12-tablet">
                    <div className="select_wrapper">
                      <p className="name">
                        {t('Автор')}
                        :
                      </p>
                      <Select
                        onChange={this.handleAuthorsSelect}
                        options={this.authors.map(author => ({ label: author, value: author }))}
                        instanceId="authorselect"
                        className="author-select-container"
                        classNamePrefix="select"
                        placeholder={t('Введите имя')}
                        ref={c => (this.authorSelect = c)}
                      />
                    </div>
                  </div>
                </div>
              </div>


              {/* Поиск */}

              <div className="column is-4-desktop is-offset-1-desktop">
                <form className="search_form" onSubmit={e => searchSubmit(e)}>
                  <input
                    type="search"
                    id="input-search"
                    name="search"
                    value={pubsearch}
                    onChange={e => searchChange(e)}
                    placeholder={t('Ваш запрос')}
                  />
                  <button type="submit" id="input-submit-button" />
                </form>
              </div>
            </div>
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
          </div>
        </section>
        <PubsList
          pubs={searchIsActive ? searchPubs : filteredPubs}
          selectedGroupName={selectedGroupName}
          selectedAuthor={selectedAuthor}
          resetAll={this.resetAll}
          resetAuthor={this.resetAuthor}
          resetGroup={this.resetGroup}
          resetSearch={resetSearch}
          isFetchingPubs={isFetchingPubs}
          activeTag={activeTag}
          searchPubs={searchPubs}
          pubsearch={pubsearch}
          searchIsActive={searchIsActive}
        />
      </Fragment>
    );
  }
}

PubsFilter.contextTypes = {
  t: PropTypes.func,
};

PubsFilter.propTypes = {
  lang: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      groupname: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  })),
  activeTag: PropTypes.string.isRequired,
  selectTag: PropTypes.func.isRequired,
  isFetchingPubs: PropTypes.bool.isRequired,
  isFetchingGroups: PropTypes.bool.isRequired,
  pubs: PropTypes.arrayOf(pubType).isRequired,
  searchPubs: PropTypes.arrayOf(pubType).isRequired,
};

PubsFilter.defaultProps = {
  groups: [],
};

export default PubsFilter;
