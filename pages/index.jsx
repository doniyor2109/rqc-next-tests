// core libs
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import cookies from 'next-cookies'

// redux actions
import * as mainActions from '../redux/actions/main'
import * as langActions from '../redux/actions/lang'
import * as eventsActions from '../redux/actions/events'
import * as newsActions from '../redux/actions/news'
import * as productsActions from '../redux/actions/products'

// components
import MainSlider from '../components/main/MainSlider'
import LoadingFull from '../components/shared/loadingFull'
import Products from '../components/main/Products'
import NewsTeaser from '../components/main/NewsTeaser'
import EventTeaser from '../components/main/EventTeaser'
import Scientists from '../components/main/Scientists'

// meta tags
import MainHead from '../components/main/MainHead'

// propTypes
import articleType from '../components/news/articleType'
import mainSlideType from '../components/main/mainSlideType'
import sciSlideType from '../components/main/sciSlideType'
import productType from '../components/main/productType'
import eventType from '../components/events/eventType'

class Index extends React.Component {
  static propTypes = {
    fetchNews: PropTypes.func.isRequired,
    fetchMain: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    fetchMainSciSlider: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    lang: PropTypes.string,
    phone: PropTypes.string,
    tablet: PropTypes.string,
    news: PropTypes.shape({
      articles: PropTypes.arrayOf(articleType),
    }),
    main: PropTypes.shape({
      data: PropTypes.shape({
        body: PropTypes.arrayOf(mainSlideType),
      }),
      sciSlider: PropTypes.arrayOf(sciSlideType),
    }),
    fb_locale: PropTypes.string,
    products: PropTypes.shape({
      items: PropTypes.arrayOf(productType),
    }),
    events: PropTypes.shape({
      events: PropTypes.arrayOf(eventType),
    }),
  }

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

  static async getInitialProps(ctx) {
    // получаем все необходимое для рендеринга компонента от сервера
    const {
      reduxStore,
      query: { fb_locale },
    } = ctx
    // получаем настройки языка из кукис
    const language =
      typeof cookies(ctx).language === 'undefined'
        ? 'ru'
        : cookies(ctx).language
    // и в зависимости от языка понимаем какой запрашивать id у CMS Prismic для основного слайдера.
    // Eсли куки language не было у пользователя, то мы присваиваем языку значение ru
    // мы не можем в этом месте ждать, пока _app выставит кукис, потому что тогда
    // слайдер не получит значение id вовремя, id будет undefined и слайдер не доставится
    const id =
      language && language === 'ru' ? 'W3GVDyQAACYAZAgb' : 'W3GV8SQAACQAZAwG'
    try {
      const mainSliderData = await mainActions.getContentbyID(id, language)
      reduxStore.dispatch(mainActions.fetchMainSuccess(id, mainSliderData))
    } catch (err) {
      reduxStore.dispatch(mainActions.fetchMainFailure(id, err))
    }

    // серверный запрос типа main (основной слайдер)
    return { fb_locale }
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  state = {
    DOMLoaded: false,
  }

  componentDidMount() {
    const {
      fetchNews,
      fetchEvents,
      fetchMainSciSlider,
      fetchProducts,
      lang,
    } = this.props
    this.setState({
      DOMLoaded: true,
    })
    fetchNews(lang, 3)
    fetchProducts(lang)
    fetchMainSciSlider(lang)
    fetchEvents(lang, 2)
  }

  componentDidUpdate(prevProps) {
    const {
      fetchNews,
      fetchMain,
      fetchEvents,
      fetchMainSciSlider,
      fetchProducts,
      lang,
    } = this.props

    if (lang !== prevProps.lang) {
      if (lang === 'en-gb') {
        fetchMain('W3GV8SQAACQAZAwG', 'en-gb')
      } else if (lang === 'ru') {
        fetchMain('W3GVDyQAACYAZAgb', 'ru')
      }
      fetchNews(lang, 3)
      fetchProducts(lang)
      fetchMainSciSlider(lang)
      fetchEvents(lang, 2)
    }
    const { hash } = window.location
    const elmnt = document.getElementById(hash.slice(1))
    if (elmnt) {
      elmnt.scrollIntoView({ block: 'start', inline: 'nearest' })
    }
  }

  render() {
    const { DOMLoaded } = this.state
    const {
      phone,
      tablet,
      news,
      main,
      fb_locale,
      products,
      events,
    } = this.props
    const { sciSlider } = main
    // console.log('main', this.props)
    return (
      <Fragment>
        {!DOMLoaded && <LoadingFull />}

        <MainHead fb_locale={fb_locale} />

        <MainSlider slides={main.data.body} phone={phone} tablet={tablet} />

        {/* <OldSite /> */}

        <NewsTeaser articles={news.articles} phone={phone} tablet={tablet} />

        <Products items={products.items} />

        <Scientists sciSlider={sciSlider} phone={phone} tablet={tablet} />

        <EventTeaser events={events.events} phone={phone} tablet={tablet} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { main, events, news, products } = state
  const { lang } = state.i18nState
  return {
    main,
    lang,
    events,
    news,
    products,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    Object.assign(
      {},
      mainActions,
      langActions,
      eventsActions,
      newsActions,
      productsActions
    ),
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Index)
