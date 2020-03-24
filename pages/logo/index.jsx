// core modules
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import cookies from 'next-cookies'

// actions
import * as logoActions from '../../redux/actions/logos'
import * as langActions from '../../redux/actions/lang'

// components
import Loading from '../../components/shared/loading'
import LogosHead from '../../components/logos/LogosHead'
import MainComponent from '../../components/logos'

class Logo extends React.Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {}

  static defaultProps = {}

  static async getInitialProps(ctx) {
    // получаем значение fb_locale от робота Facebook
    const { reduxStore, query } = ctx
    const { fb_locale } = query

    // получаем настройки языка из кукис
    const { language } = cookies(ctx)

    // запрос к Prismic через redux actons с добавлением контента в redux store
    const content = await logoActions.getLogos(language)
    reduxStore.dispatch(logoActions.fetchLogosSuccess(content))

    return { fb_locale }
  }

  componentDidUpdate(prevProps) {
    const { lang, fetchLogos } = this.props

    // обработка смены языка
    if (lang !== prevProps.lang) {
      fetchLogos(lang)
    }
  }

  render() {
    const { fb_locale, logos } = this.props
    const { isFetching, page } = logos
    return (
      <>
        {isFetching && <Loading />}
        <LogosHead fbLocale={fb_locale} />
        <MainComponent page={page} />
      </>
    )
  }
}

const mapStateToProps = state => {
  const { logos } = state
  const { lang } = state.i18nState
  return { logos, lang }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, logoActions, langActions), dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
