import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import SortingFilters from './SortingFilters';
import SearchForm from './SearchForm';
import FiltersName from './FiltersName';
import NoPubs from './NoPubs';
import FilterPubs from './FilterPubs';
import pubType from './PublicationPropTypes';
import Page from './FiltersStateManagerStyles';

import { uniqArray } from '../shared/helpers';


const propTypes = {
  pubs: PropTypes.arrayOf(pubType).isRequired,
  lang: PropTypes.string.isRequired,
  fetchSciGroups: PropTypes.func.isRequired,
  fetchPublications: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape({
      groupname: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  })),
  isFetchingPubs: PropTypes.bool.isRequired,
  isFetchingGroups: PropTypes.bool.isRequired,
};

const defaultProps = {
  groups: [],
};

export default class FiltersStateManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTag: 'SORT_DATE',
      searchRequest: '',
      selectedAuthor: '',
      selectedGroupName: '',
    };

    const { pubs } = props;

    // получаем список всех авторов из публикаций. Его нужно сформировать только один раз
    // храним его в const конструктора, чтобы он не менялся при ререндеринге других компонентов
    const arrayofAuthorswithDuplicates = pubs.map(pub => pub.data.authors
      .map(author => author.text))
      .reduce((acc, val) => acc.concat(val));
    this.authors = uniqArray(arrayofAuthorswithDuplicates);

    // bindings
    this.selectTag = this.selectTag.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.handleGroupSelect = this.handleGroupSelect.bind(this);
    this.handleAuthorsSelect = this.handleAuthorsSelect.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.resetGroup = this.resetGroup.bind(this);
    this.resetAuthor = this.resetAuthor.bind(this);
    // refs
    this.authorSelect = React.createRef();
    this.groupSelect = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeTag, searchRequest } = this.state;
    const { lang, fetchSciGroups, fetchPublications } = this.props;

    // если меняется язык
    if (lang !== prevProps.lang) {
      // получаем снова публикации
      fetchPublications(lang, activeTag, searchRequest);
      // и группы
      fetchSciGroups(lang, 'groupname');
    }
    if (searchRequest !== prevState.searchRequest && searchRequest === '') {
      fetchPublications(lang, activeTag, searchRequest);
    }
  }

  // обработка поиска
  searchSubmit(value) {
    const { activeTag } = this.state;
    const { fetchPublications, lang } = this.props;
    this.resetAuthor();
    this.resetGroup();
    this.setState({
      searchRequest: value,
    });
    fetchPublications(lang, activeTag, value);
  }


  // обработка сортировки
  selectTag(e, tag) {
    const { searchRequest } = this.state;
    const { fetchPublications, lang } = this.props;
    e.preventDefault();
    this.setState({
      activeTag: tag,
    });
    fetchPublications(lang, tag, searchRequest);
  }

  // обработка селекта научных групп
  handleGroupSelect(group) {
    this.resetAuthor();
    this.resetSearch();
    this.setState({
      selectedGroupName: group.value,
    });
  }

  // обработка селекта авторов
  handleAuthorsSelect(author) {
    this.resetGroup();
    this.resetSearch();
    this.setState({
      selectedAuthor: author.value,
    });
  }

  // сброс поиска
  resetSearch(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      searchRequest: '',
    });
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

  // сброс всех селектов и поиска
  resetAll(e) {
    this.resetGroup(e);
    this.resetAuthor(e);
    this.resetSearch(e);
  }

  render() {
    const {
      selectedAuthor, selectedGroupName, searchRequest, activeTag, searchType,
    } = this.state;

    const {
      pubs, groups, lang, isFetchingPubs, isFetchingGroups,
    } = this.props;

    // console.log('FiltersStateManager', pubs);

    const { t } = this.context;

    const filteredGroups = groups.filter(el => el.lang === lang)
      .map(group => group.data.groupname[0].text);

    return (
      <Page>
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
                  searchChange={this.searchChange}
                  searchSubmit={this.searchSubmit}
                  searchRequest={searchRequest}
                  searchType={searchType}
                />
              </div>
            </div>

            {/* Фильтры сортировки по дате, имени, журналу */}
            <SortingFilters
              selectTag={this.selectTag}
              activeTag={activeTag}
            />

          </div>
        </section>

        {/* Отображение выбранных групп, авторов или поискового запроса */}
        <div className="container">
          <FiltersName
            selectedGroupName={selectedGroupName}
            selectedAuthor={selectedAuthor}
            searchRequest={searchRequest}
            resetAuthor={this.resetAuthor}
            resetGroup={this.resetGroup}
            resetSearch={this.resetSearch}
          />

          {/* отображение публикаций */}
          {pubs.length > 0
            ? (
              <FilterPubs
                selectedAuthor={selectedAuthor}
                selectedGroupName={selectedGroupName}
                pubs={pubs}
                isFetchingPubs={isFetchingPubs}
                searchRequest={searchRequest}
                activeTag={activeTag}
              />
            )
            : !isFetchingPubs && <NoPubs resetAll={this.resetAll} />
        }
        </div>
      </Page>
    );
  }
}

FiltersStateManager.contextTypes = {
  t: PropTypes.func,
};

FiltersStateManager.propTypes = propTypes;
FiltersStateManager.defaultProps = defaultProps;
