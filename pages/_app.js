import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import cookies from 'next-cookies';
import Router from 'next/router';
import I18n from 'redux-i18n';
import withReduxStore from '../lib/with-redux-store';

import Nav from '../components/navbar/Nav';
import Footer from '../components/Footer';
import GeneralHead from '../components/GeneralHead';
import LoadingFull from '../components/shared/loadingFull';

import { translations } from '../i18n/translations';

import '../scss/index.scss';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    // добываем значение языка из пользовательских кукис
    const { language, useragreedwithcookies } = cookies(ctx);
    const hasCookies = typeof language !== 'undefined';
    const cookieConsent = typeof useragreedwithcookies !== 'undefined';

    // определяем тип устройства, чтобы потом react-media рендерила именно ту версию компонента, которая
    // совпадает с серверным html
    const { req } = ctx;
    const MobileDetect = require('mobile-detect');
    const md = new MobileDetect(req ? req.headers['user-agent'] : '');
    const phone = md.phone();
    const tablet = md.tablet();

    // Компонент получает свои pageProps с сервера
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // возвращаем pageProps с сервера и значение языка
    return {
      pageProps,
      hasCookies,
      language: hasCookies ? language : 'ru',
      phone,
      tablet,
      cookieConsent,
    };
  }

  componentDidMount() {
    // выставляем куки, если их не было
    if (!this.props.hasCookies && typeof this.props.language !== 'undefined') {
      document.cookie = `language=${this.props.language};Expires=Wed, 22 Oct 2025 07:28:00 GMT`;
    }

    Router.events.on('routeChangeStart', () => {
      document.querySelector('.transparent-wall').classList.remove('inactive');
    });
    Router.events.on('routeChangeComplete', () => {
      document.querySelector('.transparent-wall').classList.add('inactive');
    });
  }

  render() {
    const {
      Component, pageProps, reduxStore, language, phone, tablet, cookieConsent,
    } = this.props;
    // console.log("_app", this.props)
    return (
      <Container>
        <Provider store={reduxStore}>
          <I18n translations={translations} initialLang={language}>
            <GeneralHead />
            <LoadingFull isOff />
            <Nav cookieConsent={cookieConsent} />
            <Component {...pageProps} phone={phone} tablet={tablet} />
            <Footer />
          </I18n>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
