// core libs
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

// redux actions
import * as newsActions from '../redux/actions/news'

// components
import NewsTeaser from '../components/main/NewsTeaser'

class Index extends React.Component {
  static defaultProps = {
    lang: 'ru',
    phone: null,
    tablet: null,
    news: {},
    main: {},
    fb_locale: 'ru',
    products: {},
    events: {},
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  componentDidMount() {
    const { fetchNews, lang } = this.props
    fetchNews(lang, 3)
  }

  componentDidUpdate(prevProps) {
    const { fetchNews, lang } = this.props

    if (lang !== prevProps.lang) {
      fetchNews(lang, 3)
    }
    const { hash } = window.location
    const elmnt = document.getElementById(hash.slice(1))
    if (elmnt) {
      elmnt.scrollIntoView({ block: 'start', inline: 'nearest' })
    }
  }

  render() {
    const { phone, tablet, news } = this.props
    // console.log('main', this.props)
    return (
      <Fragment>
        <NewsTeaser articles={news.articles} phone={phone} tablet={tablet} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { news } = state
  const { lang } = state.i18nState
  return {
    lang,
    news,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, newsActions), dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Index)
