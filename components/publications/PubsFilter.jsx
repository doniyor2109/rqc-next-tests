import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import memoize from 'memoize-one';

import pubType from './PublicationPropTypes';
import SortingFilters from './SortingFilters';
import SortedPubs from './SortedPubs';
import SearchForm from './SearchForm';
import FiltersName from './FiltersName';
import NoPubs from './NoPubs';
import { Loading } from '../shared/loading'
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

    this.authorSelect = React.createRef();
    this.groupSelect = React.createRef();

    // получаем список всех авторов из публикаций. Его нужно сформировать только один раз
    // храним его в const конструктора, чтобы он не менялся при ререндеринге других компонентов
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
    if (this.groupSelect.current.state.value !== null) {
      this.groupSelect.current.state.value = null;
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
    if (this.authorSelect.current.state.value !== null) {
      this.authorSelect.current.state.value = null;
    }
  }

  render() {
    console.log('refs', this.authorSelect);

    const { t } = this.context;
    const {
      isFetchingGroups, isFetchingPubs, searchPubs, selectTag, activeTag,
      pubsearch, searchIsActive, searchChange, resetSearch, groups, lang, pubs, searchSubmit,
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
                        ref={this.groupSelect}
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
                        ref={this.authorSelect}
                      />
                    </div>
                  </div>
                </div>
              </div>


              {/* Поиск */}
              <div className="column is-4-desktop is-offset-1-desktop">
                <SearchForm
                  searchChange={searchChange}
                  searchSubmit={searchSubmit}
                  pubsearch={pubsearch}
                />
              </div>
            </div>

            {/* Фильтры сортировки по дате, имени, журналу */}
            <SortingFilters selectTag={selectTag} activeTag={activeTag} />

          </div>
        </section>

        <div className="container">

          <FiltersName
            selectedGroupName={selectedGroupName}
            selectedAuthor={selectedAuthor}
            pubsearch={searchIsActive ? pubsearch : ''}
            resetAuthor={this.resetAuthor}
            resetGroup={this.resetGroup}
            resetSearch={resetSearch}
            searchIsActive={searchIsActive}
          />

          <div className="columns">
            <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">

              {isFetchingPubs && <Loading /> }

              {/* список публикаций с сортировкой */}
              {!isFetchingPubs
              && (
              <SortedPubs
                pubs={searchIsActive ? searchPubs : filteredPubs}
                searchRequest={searchIsActive ? pubsearch : ''}
                tag={activeTag}
              />
              )
                                          }
              {/* если нет публикаций */}
              {!isFetchingPubs && pubs.length === 0
                && <NoPubs resetAll={this.resetAll} />
                }
            </div>
          </div>
        </div>
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
  searchIsActive: PropTypes.bool.isRequired,
  pubsearch: PropTypes.string.isRequired,
  searchChange: PropTypes.func.isRequired,
  searchSubmit: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,

};

PubsFilter.defaultProps = {
  groups: [],
};

export default PubsFilter;
