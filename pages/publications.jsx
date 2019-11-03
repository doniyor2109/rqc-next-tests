/* eslint-disable camelcase */
// core dependencies
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookies from 'next-cookies';
import styled from 'styled-components';

// components
import PubHead from '../components/publications/PubHead';
import pubType from '../components/publications/PublicationPropTypes';
import FiltersStateManager from '../components/publications/FiltersStateManager';

// actions
import * as pubsActions from '../redux/actions/publications';
import * as groupsActions from '../redux/actions/scigroups';
import * as langActions from '../redux/actions/lang';

const PublicationPage = styled.div`
  padding: 6rem 0;
`;

// Основной компонент, связывающий весь интерфейс страницы /publications воедино
class Publications extends Component {
  static async getInitialProps(ctx) {
    // получаем все необходимое для рендеринга компонента от сервера
    const { reduxStore, query: { group, author } } = ctx;

    // получаем настройки языка из кукис
    const { language } = cookies(ctx);

    // получаем публикации
    const serverPubs = await pubsActions.getAllResultsfromPaginatedAPI(language, '[my.publication.date desc]');
    reduxStore.dispatch(pubsActions.fetchPublicationsSuccess(serverPubs));

    return { group, author };
  }

  componentDidMount() {
    const { lang, fetchSciGroups } = this.props;
    fetchSciGroups(lang, 'groupname');
  }

  render() {
    const { t } = this.context;
    const {
      publications, scigroups,
      fetchPublications, lang, fb_locale, fetchSciGroups, group, author,
    } = this.props;
    // console.log('pubs', this.props)
    return (
      <Fragment>
        <PubHead fbLocale={fb_locale} />
        <PublicationPage>
          <div className="container">
            <h1 className="page-main-heading">
              {t('Публикации')}
            </h1>
          </div>
          <FiltersStateManager
            fetchPublications={fetchPublications}
            pubs={publications.pubs}
            isFetchingPubs={publications.isFetchingPubs}
            fetchSciGroups={fetchSciGroups}
            groups={scigroups.groups}
            isFetchingGroups={scigroups.isFetching}
            lang={lang}
            groupFromURL={group}
            authorFromURL={author}
          />
        </PublicationPage>
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
  fetchSciGroups: PropTypes.func.isRequired,
  publications: PropTypes.shape({
    pubs: PropTypes.arrayOf(pubType),
    isFetchingPubs: PropTypes.bool,
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
    isFetching: PropTypes.bool,
  }).isRequired,
  group: PropTypes.string,
  author: PropTypes.string,
};

Publications.defaultProps = {
  fb_locale: 'undefined',
  group: '',
  author: '',
};

// Redux функции state и dispatch
const mapStateToProps = (state) => {
  const { publications, scigroups } = state;
  const { lang } = state.i18nState;
  return { publications, scigroups, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  pubsActions,
  groupsActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
