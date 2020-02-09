import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import cookies from 'next-cookies'
import Router from 'next/router'
import I18n from 'redux-i18n'
import MobileDetect from 'mobile-detect'
import withReduxStore from '../lib/with-redux-store'
import Nav from '../components/navbar/Nav'
import Footer from '../components/footer/Footer'
import GeneralHead from '../components/GeneralHead'
import LoadingFull from '../components/shared/loadingFull'
import Menuloader from '../components/shared/Menuloader'

import { translations } from '../i18n/translations'

import '../scss/index.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const { useragreedwithcookies } = cookies(ctx)
    const hasLanguageSettingInCookies = cookies(ctx).language
    const language = hasLanguageSettingInCookies || 'ru'

    // добываем значение языка из пользовательских кукис
    const cookieConsent = typeof useragreedwithcookies !== 'undefined'

    // определяем тип устройства, чтобы потом react-media
    // рендерила именно ту версию компонента, которая
    // совпадает с серверным html
    const { req } = ctx
    const md = new MobileDetect(req ? req.headers['user-agent'] : '')
    const phone = md.phone()
    const tablet = md.tablet()

    // Компонент получает свои pageProps с сервера
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // возвращаем pageProps с сервера и значение языка
    return {
      pageProps,
      language,
      phone,
      tablet,
      hasLanguageSettingInCookies,
      cookieConsent,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      loadingIsActive: false,
    }
  }

  componentDidMount() {
    // выставляем куки, если их не было
    if (!this.props.hasLanguageSettingInCookies) {
      document.cookie = `language=${this.props.language};Expires=Wed, 22 Oct 2025 07:28:00 GMT`
    }

    // при переходе со страницы на страницу сообщаем компоненту,
    // что идет загрузка, чтобы показывать спиннер
    Router.events.on('routeChangeStart', () => {
      this.setState({
        loadingIsActive: true,
      })
    })
    Router.events.on('routeChangeComplete', () => {
      this.setState({
        loadingIsActive: false,
      })
    })
  }

  render() {
    const {
      Component,
      pageProps,
      reduxStore,
      language,
      phone,
      tablet,
      cookieConsent,
    } = this.props

    const { loadingIsActive } = this.state
    return (
      <Provider store={reduxStore}>
        <I18n translations={translations} initialLang={language}>
          <Menuloader />
          <GeneralHead />
          {loadingIsActive && <LoadingFull />}
          <Nav cookieConsent={cookieConsent} tablet={tablet} phone={phone} />
          <Component {...pageProps} phone={phone} tablet={tablet} />
          <Footer />
        </I18n>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
