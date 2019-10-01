// core modules
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import cookies from 'next-cookies';
import Prismic from 'prismic-javascript';

// actions
import * as aboutActions from '../redux/actions/about';
import * as langActions from '../redux/actions/lang';

// components
import AboutHead from '../components/about/AboutHead';
import Whatwedo from '../components/about/Whatwedo';
import ReportsAndMedia from '../components/about/ReportsAndMedia';
import Partners from '../components/about/Partners';
import Vacancies from '../components/about/Vacancies';
import Contacts from '../components/about/Contacts';

// other libraries
import PrismicConfig from '../prismic-configuration';

class About extends React.Component {
  static propTypes = {
    lang: PropTypes.string,
    fb_locale: PropTypes.string,
    fetchAbout: PropTypes.func.isRequired,
    phone: PropTypes.string,
    tablet: PropTypes.string,
    about: PropTypes.shape({
      isFetching: PropTypes.bool,
      page: PropTypes.shape(),
    }),
  }

  static defaultProps = {
    lang: 'ru',
    fb_locale: 'ru',
    phone: null,
    tablet: null,
    about: {},
  }

  static async getInitialProps(ctx) {
    // получаем все необходимое для рендеринга компонента от сервера
    const { reduxStore, query } = ctx;
    const { fb_locale } = query;

    // получаем настройки языка из кукис
    const { language } = cookies(ctx);

    // запрос к Prismic через redux actons с добавлением контента в redux store
    reduxStore.dispatch(aboutActions.fetchAboutRequest());
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    await api.query(Prismic.Predicates.at('document.type', 'about'), { lang: language })
      .then(response => reduxStore.dispatch(aboutActions.fetchAboutSuccess(response)))
      .catch(error => reduxStore.dispatch(aboutActions.fetchAboutError(error)));

    return { fb_locale };
  }

  componentDidUpdate(prevProps) {
    const { hash } = window.location;
    const elmnt = document.getElementById(hash.slice(1));
    if (elmnt) {
      elmnt.scrollIntoView();
    }
    // обработка смены языка
    const { lang, fetchAbout } = this.props;
    if (lang !== prevProps.lang) {
      fetchAbout(lang);
    }
  }

  render() {
    const {
      phone, tablet, fb_locale, about, lang
    } = this.props;
    const { page } = about;
    // console.log('about', this.props);

    return (
      <>
        <AboutHead fb_locale={fb_locale} />
        <Whatwedo
          page={page}
          phone={phone}
        />
        <Vacancies phone={phone} tablet={tablet} lang />
        <ReportsAndMedia page={page} />
        <Contacts page={page} lang={lang} />
        <Partners page={page} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { about } = state;
  const { lang } = state.i18nState;
  return { about, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  aboutActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(About);
