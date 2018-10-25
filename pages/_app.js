import App, {Container} from 'next/app'
import { withRouter } from 'next/router'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Head from 'next/head'

import Nav from '../components/navbar/Nav'
import Footer from '../components/Footer'

import I18n from "redux-i18n"
import { translations } from "../i18n/translations"

import { Cookies } from 'react-cookie'

import '../scss/index.scss'

class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {

    const cookie = new Cookies()
    const lang = typeof cookie.get('language') === 'undefined' ? 'ru' : cookie.get('language')
    
    const {Component, pageProps, reduxStore} = this.props
    // console.log("_app", this.props)
    return (
      <Container>
        <Provider store={reduxStore}>
          <I18n translations={translations} initialLang={lang}>
          <Head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          </Head>
            <Nav withSlider={false}/>
            <Component {...pageProps}/>
            <Footer />
          </I18n>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(withRouter(MyApp))
