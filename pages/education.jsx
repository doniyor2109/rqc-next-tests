import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../prismic-configuration';

import * as educationActions from '../redux/actions/education';
import * as langActions from '../redux/actions/lang';


import EducationHead from '../components/education/EducationHead';
import EducationPage from '../components/education/EducationPage';
import PageHeading from '../components/shared/PageHeading';
import H3 from '../components/shared/styled/H3';
import Projects from '../components/education/Projects';

// Основной компонент, связывающий весь интерфейс страницы /news воедино
class Education extends Component {

  static contextTypes = {
    t: PropTypes.func,
  }

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
      fb_locale, education, phone,
    } = this.props;

    const { t } = this.context;
    const { page } = education;

    console.log('education', this.props);

    return (
      <EducationPage>
        <EducationHead fbLocale={fb_locale} />
        <div className="container">
          <PageHeading title="Образование" />
          <div className="description">
            {RichText.render(page.data.description, PrismicConfig.linkResolver)}
          </div>
          <H3>
            {t('Список дипломных проектов')}
          </H3>
        </div>
        <Projects items={page.data.teamlead} phone={phone}/>
      </EducationPage>
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
