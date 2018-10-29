import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import cookies from 'next-cookies'
import Router from 'next/router'

import Nav from '../components/navbar/Nav'
import Footer from '../components/Footer'
import GeneralHead from '../components/GeneralHead'
import { LoadingFull } from '../components/shared/loadingFull.js'

import I18n from "redux-i18n"
import { translations } from "../i18n/translations"


import '../scss/index.scss'


class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {}

    // добываем значение языка из пользовательских кукис 
    const {language} = cookies(ctx)
    const hasCookies = typeof language === 'undefined' ? false : true

    // определяем тип устройства, чтобы потом react-media рендерила именно ту версию компонента, которая
    // совпадает с серверным html
    const { req } = ctx
    var MobileDetect = require('mobile-detect')
    const md = new MobileDetect(req ? req.headers['user-agent'] : "")
    const phone = md.phone()
    const tablet = md.tablet()
  
    // Компонент получает свои pageProps с сервера
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // возвращаем pageProps с сервера и значение языка
    return { pageProps, language: hasCookies ? language : "ru", phone: phone, tablet: tablet }
  }

  componentDidMount() {
    // выставляем куки, если их не было
    if (document.cookie.length === 0) {
      document.cookie = "language=" + this.props.language
    }

    Router.events.on('routeChangeStart', (url) => {
      document.querySelector(".transparent-wall").classList.remove('inactive')
      console.log(`Loading: ${url}`)
    })
    Router.events.on('routeChangeComplete', () => {
      document.querySelector(".transparent-wall").classList.add('inactive')
      console.log("route changed complete")
    })
  }

  render () {

    const {Component, pageProps, reduxStore, language, phone, tablet} = this.props
    console.log("_app", this.props)
    return (
      <Container>
        <Provider store={reduxStore}> 
          <I18n translations={translations} initialLang={language}>
            <GeneralHead />
            <LoadingFull isOff />
            <Nav /> 
            <Component {...pageProps} phone={phone} tablet={tablet} />
            <Footer />
          </I18n>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
