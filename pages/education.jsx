import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';

import * as educationActions from '../redux/actions/education';
import * as langActions from '../redux/actions/lang';

import EducationHead from '../components/education/EducationHead';
import EducationPage from '../components/education/EducationPage';
import PageHeading from '../components/shared/PageHeading';


// Основной компонент, связывающий весь интерфейс страницы /news воедино
class Education extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    phone: PropTypes.bool,
    tablet: PropTypes.bool,
    fb_locale: PropTypes.string,
  }

  static defaultProps = {
    phone: true,
    tablet: false,
    fb_locale: 'ru',
  }

  static async getInitialProps(ctx) {
    // получаем все необходимое для рендеринга компонента от сервера
    const { reduxStore, query } = ctx;
    const { fb_locale } = query;

    // получаем настройки языка из кукис
    const { language } = cookies(ctx);

    // запрос к Prismic через redux actons с добавлением контента в redux store
    try {
      const educationContent = await educationActions.getEducationContent(language);
      reduxStore.dispatch(educationActions.fetchEducationSuccess(educationContent));
    } catch (error) {
      reduxStore.dispatch(educationActions.fetchEducationFailure(error));
    }

    return { fb_locale };
  }

  render() {
    const {
      fetchEducation, fb_locale, phone, tablet, lang, education,
    } = this.props;

    console.log('education', this.props);

    return (
      <Fragment>
        <EducationHead fbLocale={fb_locale} />
        <div className="container">
          <EducationPage>
            <PageHeading title="Образование" />
          </EducationPage>
        </div>
      </Fragment>
    );
  }
}

// Redux функции state и dispatch
const mapStateToProps = (state) => {
  const { education } = state;
  const { lang } = state.i18nState;
  return { education, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  educationActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Education);
