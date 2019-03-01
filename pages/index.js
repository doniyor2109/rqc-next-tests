import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Media from 'react-media'
import Head from 'next/head'
import cookies from 'next-cookies'

import * as mainActions from '../redux/actions/main'
import * as langActions from '../redux/actions/lang'
import * as eventsActions from '../redux/actions/events'
import * as newsActions from '../redux/actions/news'


import {fetchMainSliderRequest, 
        fetchMainSliderSuccess, 
        fetchMainSliderFailure} from '../redux/actions/main'

import { NewscardSmall } from '../components/news/NewscardSmall.js'
import MainSlider from '../components/sliders/MainSlider'
import SciSlider from '../components/sliders/SciSlider'
import {Loading} from '../components/shared/loading'
import OldSite from '../components/oldSite.js'
import Products from '../components/products/index'
import {CardLarge} from '../components/events/CardLarge'
import {CardSmall} from '../components/events/CardSmall'


import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration';
import hostName from '../host'
import '../scss/mainpage.scss'
import '../scss/events.scss'


class Index extends React.Component {

  static async getInitialProps (ctx) {
        
    // получаем все необходимое для рендеринга компонента от сервера
    const {reduxStore} = ctx
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    
    // получаем настройки языка из кукис 
    // и в зависимости от языка понимаем какой запрашивать id у призмика для основного слайдера
    // если куки language не было у пользователя, то мы присваиваем языку значение ru 
    // мы не можем в этом месте ждать, пока _app выставит кукис, потому что тогда 
    // слайдер не получит значение id вовремя, id будет undefined и слайдер не доставится
    const l = typeof cookies(ctx).language === 'undefined' ? "ru" : cookies(ctx).language
    
    // серверный запрос основного слайдера
    const id = (l && l === 'ru' ? 'W3GVDyQAACYAZAgb' : 'W3GV8SQAACQAZAwG')
    reduxStore.dispatch(fetchMainSliderRequest()) 
    await api.query(Prismic.Predicates.at('document.id', id), { lang: l})
             .then(response => reduxStore.dispatch(fetchMainSliderSuccess(id, response)))
             .catch(error => reduxStore.dispatch(fetchMainSliderFailure(id, error)))

    return {lan: l}
  }

  static contextTypes = {
    t: PropTypes.func
  }

  state = {
    DOMLoaded: false
  }

  componentDidMount() {
    this.setState({
      DOMLoaded: true
    })
    // this.props.fetchEvents(this.props.lang, 5)
    this.props.fetchNews(this.props.lang, 3) 
    this.props.fetchMainSciSlider(this.props.lang)
  }

  componentDidUpdate(prevProps) {

    if (this.props.lang !== prevProps.lang) {
      if (this.props.lang === "en-gb"){
        this.props.fetchMainSlider('W3GV8SQAACQAZAwG', "en-gb")
      } else if(this.props.lang === "ru") {
        this.props.fetchMainSlider('W3GVDyQAACYAZAgb', "ru")
      }
      this.props.fetchMainSciSlider(this.props.lang)
      // this.props.fetchEvents(this.props.lang, 5)
      this.props.fetchNews(this.props.lang, 3) 
    }
  }

  render() {

    const { phone, tablet, news, events } = this.props
    const { mainSlider, sciSlider, isFetchingMain, isFetchingSci } = this.props.main

    console.log("main", this.props)
    if (!this.state.DOMLoaded) return <Loading />
    else 
    return (
      <Fragment>
        <Head>
          <title>{this.context.t("Российский Квантовый Центр – главная")}</title>
          <meta property="og:url"                content={hostName} />
          <meta property="og:type"               content="article" />
          <meta property="og:image"              content={hostName +  "/static/RQClogo_black_ru.svg"} />
          <meta property="og:locale:alternate" content="en_US" />
        {(typeof fb_locale === 'undefined' || this.props.fb_locale === "ru_RU") && 
          <Fragment>
              <meta property="og:locale" content="ru_RU" />
              <meta property="og:title"              content="Российский Квантовый Центр – главная" />
              <meta property="og:description"        content="Добро пожаловать на официальный сайт Российского Квантового Центра!" />
          </Fragment>
        }
        {this.props.fb_locale === "en_US" && 
          <Fragment>
              <meta property="og:locale" content="en_US" />
              <meta property="og:title"              content="Russian Quantum Center – home page" />
              <meta property="og:description"        content="Welcome to the official website of the Russian Quantum Center!" />
          </Fragment>
        }
        </Head>
        <section className="main-slider">
          {mainSlider && mainSlider.data && <MainSlider slides={mainSlider.data.body}
                                          isLoading={isFetchingMain}
                                          phone={phone}
                                          tablet={tablet}
                                /> }
        </section>

        <OldSite />

        {/* блок мероприятий */}
        {/* <section className="event-teaser">
          <div className="container">
            <Link href="/events">
              <a className="main-category">
                {this.context.t("Мероприятия")}
              </a>
            </Link>
            <Link href="/events">
              <a className="main-category-link">
                {this.context.t("смотреть все")}
              </a>
            </Link>
            <div className="columns is-multiline">

              {/* в зависимости от размера окна браузера мы рендерим разные верстки секции с тизерами мероприятий */}
              {/* вариант смартфона */}
              {/* {events.events 
              && <Media query="(max-width: 415px)"
                        defaultMatches={tablet !== null}
                        render={() => events.events.slice(0,3).map((item, index) =>
                                        <CardSmall item={item} key={index} />)}
                  />
                
              } */}
              {/* вариант смартфона */}
              {/* {events.events 
              && <Media query="(min-width: 416px) and (max-width: 768px)"
                        defaultMatches={tablet !== null}
                        render={() => events.events.slice(0,3).map((item, index) => {
                          if (index === 0) {
                            return <CardLarge item={item} key={index} tablet/>
                          } else return <CardSmall item={item} key={index} tablet/>
                        })}
                  />
                
              } */}
              {/* вариант десктопа */}
              {/* {events.events 
              && <Media query="(min-width: 769px)"
                        defaultMatches={phone === null && tablet === null}
                        render={() => events.events.map((item, index) => {
                          if (index === 0) {
                            return <CardLarge item={item} key={index} desktop/>
                          } else return <CardSmall item={item} key={index} desktop/>
                        })}
                  />
              } */}
            {/* </div>
          </div>
        </section> */}

        <section className="news-teaser">
          <div className="container">
            <Link href="/news">
              <a className="main-category">
                {this.context.t("Новости")}
              </a>
            </Link>
            <Link href="/news">
              <a className="main-category-link">
                {this.context.t("смотреть все")}
              </a>
            </Link>
            <div className="columns is-multiline">

              {/* в зависимости от размера окна браузера мы рендерим разные верстки секции с тизерами новостей */}
              {/* вариант смартфона и Ipad */}
              {news.articles 
              && <Media query="(max-width: 768px)"
                        defaultMatches={tablet !== null}
                        render={() => news.articles.slice(0,2).map((item, index) =>
                                        <NewscardSmall columns="6" article={item} key={index} />)}
                  />
                
              }
              {/* вариант десктопа */}
              {news.articles 
              && <Media query="(min-width: 769px)"
                        defaultMatches={phone === null && tablet === null}
                        render={() => news.articles.map((item, index) =>
                                        <NewscardSmall columns="4" article={item} key={index} />)}
                  />
                
              }
            </div>
          </div>
        </section>

        <Products />

        <section className="sci-slider">
          <div className="container">
            <a className="main-category">
              {this.context.t("Лица")}
            </a>
            <Link href="/research">
              <a className="main-category-link">
                {this.context.t("все научные группы")}
              </a>
            </Link>
            {/* слайдер ученых для десктопа */}
            {sciSlider.length > 0 && <Media query="(min-width: 769px)"
                                            defaultMatches={phone === null && tablet === null}
                                            render={() => <SciSlider slides={sciSlider}
                                                                     isLoading={isFetchingSci}
                                                                     desktop
                                                            />}
                                      />}
            {/* слайдер ученых для Ipad */}
            {sciSlider.length > 0 &&  <Media  query="(min-width: 416px) and (max-width: 769px)"
                                              defaultMatches={tablet !== null}
                                              render={() => <SciSlider  slides={sciSlider}
                                                                        isLoading={isFetchingSci}
                                                                        ipad                                  
                                      />
             }
                />
            }
            {/* слайдер ученых для смартфона */}
            {sciSlider.length > 0 &&  <Media query="(max-width: 415px)"
                                             defaultMatches={phone !== null}
                                             render={() => <SciSlider slides={sciSlider}
                                                                      isLoading={isFetchingSci}
                                                                      iphone                                    
                                      />
             }
                />
            }
          </div>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { main, events, news } = state
  const { lang } = state.i18nState
  return { main, lang, events, news }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
      mainActions,
      langActions,
      eventsActions,
      newsActions
    ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Index)
