// Cтраница rqc.ru/publications,  на которую выводятся все публикации
// из админки по типу «publication».
// Есть несколько челленджей в этом компоненте:

// 1. Данные хранятся в CMS Prismic, API которого позволяет получить
// только 100 документов за раз.
// (всего публикаций ~ 300)

// 2. Так как, нам нужен список всех авторов публикаций,
// то приходится загружать все публикации сразу,
// это делается через рекурсию в redux actions creators
// Не факт, что это лучший способ, но он, как минимум,
// позволяет избежать лишнего рендеринга при вызове API

// core dependencies
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookies from 'next-cookies';

// components
import Prismic from 'prismic-javascript';
import PubHead from '../components/publications/PubHead';
import PubsFilter from '../components/publications/PubsFilter';
import pubType from '../components/publications/PublicationPropTypes';

// prismic api
import PrismicConfig from '../prismic-configuration';
import {
  fetchPublicationsRequest,
  fetchPublicationsSuccess,
  fetchPublicationsFailure,
  fetchPublications,
} from '../redux/actions/publications';


// actions
import * as groupsActions from '../redux/actions/scigroups';
import * as langActions from '../redux/actions/lang';


// Основной компонент, связывающий весь интерфейс страницы /publications воедино
class Publications extends Component {
  static async getInitialProps(ctx) {
    // получаем все необходимое для рендеринга компонента от сервера
    const { reduxStore } = ctx;

    // получаем настройки языка из кукис
    const { language } = cookies(ctx);

    // получаем  publications на сервере
    async function fetchPubsServer(lang, pageSize, page, resultsAcc) {
      reduxStore.dispatch(fetchPublicationsRequest('SORT_DATE'));
      console.log("fetchPubsServer called")
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
      const response = await api.query(Prismic.Predicates.at('document.type', 'publication'),
        {
          lang,
          pageSize,
          page,
          orderings: '[my.publication.date desc]',
          fetchLinks: ['science_group.groupname'],
        })

      const results = resultsAcc.concat(response.results);
      
      if (response.next_page !== null) {
        fetchPubsServer(language, pageSize, page + 1, results);
      } else {
        return await reduxStore.dispatch(fetchPublicationsSuccess(results));
      }
    }

    const pubsServer = fetchPubsServer(language, 100, 1, [])
    console.log("pubsServer", pubsServer)
    return {pubsServer};
  }

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 100,
      pageNumber: 1,
      activeTag: 'SORT_DATE',
      pubsearch: '',
      searchIsActive: false,
    };
    this.selectTag = this.selectTag.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  // componentDidMount() {
  //   const { pageSize, pageNumber, activeTag } = this.state;
  //   const { lang, fetchSciGroups } = this.props;
  //   // fetchPublications(lang, pageSize, pageNumber, activeTag, []);
  //   // fetchSciGrousps(lang, 'groupname');
  // }

  // componentDidUpdate(prevProps) {
  //   const { pageSize, pageNumber, activeTag } = this.state;
  //   const { lang, fetchSciGroups } = this.props;
  //   // если меняется язык
  //   if (lang !== prevProps.lang) {
  //     // получаем снова публикации
  //     fetchPublications(lang, pageSize, pageNumber, activeTag, []);
  //     // и группы
  //     fetchSciGroups(lang, 'groupname');
  //   }
  // }

  // поиск
  searchChange(e) {
    this.setState({
      pubsearch: e.target.value,
    });
  }

  searchSubmit(e) {
    const { pubsearch, activeTag } = this.state;
    const { searchPublication } = this.props;
    e.preventDefault();
    if (pubsearch.length) {
      this.setState({
        searchIsActive: true,
      });
      searchPublication(pubsearch, activeTag);
    }
  }

  // обработка сортировки
  selectTag(e, tag) {
    const { fetchPublications, searchPublication, lang } = this.props;
    const {
      searchIsActive, pageSize, pageNumber, pubsearch,
    } = this.state;
    e.preventDefault();
    this.setState({
      activeTag: tag,
    });
    if (searchIsActive === false) {
      fetchPublications(lang, pageSize, pageNumber, tag, []);
    } else {
      searchPublication(pubsearch, tag);
    }
  }

  // сброс поиска
  resetSearch(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      pubsearch: '',
      searchIsActive: false,
    });
  }

  render() {

    console.log("RENDER COMPONENT publications", this.props)
    const { t } = this.context;
    const {
      activeTag, pageSize, pageNumber, searchIsActive, pubsearch,
    } = this.state;
    const {
      publications, scigroups,
      fetchPublications, searchPublication, lang, fb_locale,
    } = this.props;

    return (
      <Fragment>
        {/* <PubHead fbLocale={fb_locale} />
        <div className="pubspage">
          <div className="container">
            <h1 className="page-main-heading">
              {t('Публикации')}
            </h1>
          </div>
          <div>
            {publications.pubs.length > 0
            && (
            <PubsFilter
              pubs={publications.pubs}
              searchPubs={publications.search}
              groups={scigroups.groups}
              isFetchingPubs={publications.isFetchingPubs}
              isFetchingGroups={scigroups.isFetching}

              // все это наверное  можно было  бы не передавать,
              // если как то решить проблему со state, который нужен всем
              searchChange={this.searchChange}
              searchSubmit={this.searchSubmit}
              searchIsActive={searchIsActive}
              pubsearch={pubsearch}
              resetSearch={this.resetSearch}
              activeTag={activeTag}
              selectTag={this.selectTag}
              pageSize={pageSize}
              pageNumber={pageNumber}
              fetchPublications={fetchPublications}
              searchPublication={searchPublication}
              lang={lang}
            />
            )}
          </div>
        </div> */}
      </Fragment>
    );
  }
}

Publications.contextTypes = {
  t: PropTypes.func,
};

Publications.propTypes = {
  lang: PropTypes.string.isRequired,
  fb_locale: PropTypes.string,
  fetchPublications: PropTypes.func.isRequired,
  searchPublication: PropTypes.func.isRequired,
  fetchSciGroups: PropTypes.func.isRequired,
  publications: PropTypes.shape({
    pubs: PropTypes.arrayOf(pubType),
  }).isRequired,
  scigroups: PropTypes.shape({
    groups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.shape({
        groupname: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      }),
    })),
  }).isRequired,
};

Publications.defaultProps = {
  fb_locale: 'undefined',
};

// Redux функции state и dispatch
const mapStateToProps = (state) => {
  const { publications, scigroups } = state;
  const { lang } = state.i18nState;
  return { publications, scigroups, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  groupsActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
