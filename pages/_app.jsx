import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import I18n from 'redux-i18n'
import MobileDetect from 'mobile-detect'
import withReduxStore from '../lib/with-redux-store'

import { translations } from '../i18n/translations'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const { req } = ctx
    const md = new MobileDetect(req ? req.headers['user-agent'] : '')
    const phone = md.phone()
    const tablet = md.tablet()

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps,
      phone,
      tablet,
    }
  }

  render() {
    const { Component, pageProps, reduxStore, phone, tablet } = this.props

    return (
      <Provider store={reduxStore}>
        <I18n translations={translations} initialLang="en-gb">
          <Component {...pageProps} phone={phone} tablet={tablet} />
        </I18n>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
