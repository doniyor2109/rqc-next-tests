import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Head from 'next/head'
import cookies from 'next-cookies'

import Nav from '../components/navbar/Nav'
import Footer from '../components/Footer'

import I18n from "redux-i18n"
import { translations } from "../i18n/translations"

import '../scss/index.scss'

class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {}

    // добываем значение языка из пользовательских кукис 
    var { language } = cookies(ctx)
    
    // если кук нет, то на этом этапе выставляем значение языка undefined, чтобы передать его в компонент, 
    // и в цикле ComponentDidMount выставить куки

    if (typeof language === 'undefined') {
      language = 'undefined'
    }

    // Компонент получает свои pageProps с сервера
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
 
    // возвращаем pageProps с сервера и значение языка
    return { pageProps, language: language}
  }

  componentDidMount() {

    // выставляем куки, если их не было
    if (this.props.language === "undefined") {
      document.cookie = "language=ru"
    }
  }

  render () {

    const {Component, pageProps, reduxStore, language} = this.props
    console.log("_app", this.props)
    return (
      <Container>
        <Provider store={reduxStore}>
          <I18n translations={translations} initialLang={language}>
          <Head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          </Head>
            <Nav />
            <Component {...pageProps} />
            <Footer />
          </I18n>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
