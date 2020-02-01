// core modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

// actions
import * as teamActions from '../redux/actions/team';
import * as langActions from '../redux/actions/lang';

// components
import TeamMainComponent from '../components/team';
import Loading from '../components/shared/loading';

import TeamType from '../components/team/TeamPropType';

class Team extends Component {
  static propTypes = {
    team: PropTypes.shape({
      isFetching: PropTypes.bool,
      item: TeamType.item,
    }),
    lang: PropTypes.string,
    contentLang: PropTypes.string,
    uid: PropTypes.string,
    switchLanguageProgrammatically: PropTypes.func.isRequired,
    language: PropTypes.shape({
      userClicked: PropTypes.number,
    }),
    phone: PropTypes.string,
    tablet: PropTypes.string,
  }

  static defaultProps = {
    team: {},
    lang: 'ru',
    contentLang: 'ru',
    uid: '',
    language: PropTypes.shape({
      userClicked: 0,
    }),
    phone: null,
    tablet: null,
  }

  static async getInitialProps(ctx) {
    const { reduxStore, query: { uid } } = ctx;

    let contentLang = '';

    // запрос к Prismic через redux actons с добавлением контента в redux store
    try {
      const serverFetch = await teamActions.getTeamGraph(uid, '*');
      reduxStore.dispatch(teamActions.fetchTeamSuccess(uid, serverFetch));
      contentLang = serverFetch.lang;
    } catch (error) {
      return reduxStore.dispatch(teamActions.fetchTeamFailure(uid, error));
    }
    return { uid, contentLang };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { lang, contentLang, switchLanguageProgrammatically } = this.props;
    if (contentLang !== lang) {
      switchLanguageProgrammatically(contentLang);
    }
  }

  componentDidUpdate(prevProps) {
    // если глобально меняется язык и мы знаем, что он поменялся в результате
    // действий пользователя (userClicked), то редиректим пользователя на страницу с другим uid
    // если бы не было флага userClicked, то компонент бы уходил в бесконечный цикл
    // из-за изменения языка в componentDidMount()
    const { lang, language, team } = this.props;

    if ((lang !== prevProps.lang) && (language.userClicked !== prevProps.language.userClicked)) {
      if (team.item.alternate_languages.length > 0) {
        Router.push(`/team/${team.item.alternate_languages[0].uid}`);
      }
    }
  }

  render() {
    const {
      team, phone, tablet, lang,
    } = this.props;

    // console.log('team', this.props);

    return (
      <>
        {team.isFetching && <Loading />}
        <TeamMainComponent
          team={team}
          phone={phone}
          tablet={tablet}
          lang={lang}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { team, language } = state;
  const { lang } = state.i18nState;
  return { team, lang, language };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  teamActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Team);
