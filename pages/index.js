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

import {fetchMainRequest, 
        fetchMainSuccess, 
        fetchMainFailure} from '../redux/actions/main'

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


class Index extends React.Component {

  static async getInitialProps (ctx) {
        
    // получаем все необходимое для рендеринга компонента от сервера
    const {reduxStore} = ctx
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    
    // получаем настройки языка из кукис 
    // и в зависимости от языка понимаем какой запрашивать id у CMS Prismic для основного слайдера.
    // Eсли куки language не было у пользователя, то мы присваиваем языку значение ru 
    // мы не можем в этом месте ждать, пока _app выставит кукис, потому что тогда 
    // слайдер не получит значение id вовремя, id будет undefined и слайдер не доставится
    const language = typeof cookies(ctx).language === 'undefined' ? "ru" : cookies(ctx).language
    
    // серверный запрос типа main (основной слайдер + важное мероприятие)
    const id = (language && language === 'ru' ? 'W3GVDyQAACYAZAgb' : 'W3GV8SQAACQAZAwG')
    reduxStore.dispatch(fetchMainRequest()) 
    await api.query(Prismic.Predicates.at('document.id', id), 
                                          { lang: language, 
                                            fetchLinks: ['event.title',
                                                         'event.wallpaper',
                                                         'event.start_date_time',
                                                         'event.end_date',
                                                         'event.additional',
                                                         'event.description'
                                                        ]
                                          })
             .then(response => reduxStore.dispatch(fetchMainSuccess(id, response)))
             .catch(error => reduxStore.dispatch(fetchMainFailure(id, error)))
    return {lan: language}
  }

  static contextTypes = {
    t: PropTypes.func
  }

  state = {
    DOMLoaded: false,
  }

  componentDidMount() {
    this.setState({
      DOMLoaded: true
    })
    this.props.fetchEvents(this.props.lang, 2)
    this.props.fetchNews(this.props.lang, 3) 
    this.props.fetchMainSciSlider(this.props.lang)
  }

  componentDidUpdate(prevProps) {

    if (this.props.lang !== prevProps.lang) {
      this.setState({
        events: []
      })
      if (this.props.lang === "en-gb"){
        this.props.fetchMain('W3GV8SQAACQAZAwG', "en-gb")
      } else if(this.props.lang === "ru") {
        this.props.fetchMain('W3GVDyQAACYAZAgb', "ru")
      }
      this.props.fetchMainSciSlider(this.props.lang)
      this.props.fetchEvents(this.props.lang, 2)
      this.props.fetchNews(this.props.lang, 3) 
    }
  }

  render() {

    const { phone, tablet, news, main } = this.props
    const { sciSlider, isFetchingMain, isFetchingSci } = this.props.main

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
          {main.data && <MainSlider slides={main.data.body}
                                          isLoading={isFetchingMain}
                                          phone={phone}
                                          tablet={tablet}
                                /> }
        </section>

        <OldSite />


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
        {/* блок мероприятий */}
        <section className="event-teaser">
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

              {/* в зависимости от размера окна браузера рендерим разные верстки секции с тизерами мероприятий */}
              {/* вариант смартфона и планшета*/}
              <Media query="(max-width: 768px)"
                        defaultMatches={tablet !== null}
                        render={() => this.props.events.events.map((item, index) =>
                                        <CardSmall item={item} key={index} />)}
              />
                            
              {/* вариант десктопа */}
              <Media query="(min-width: 769px)"
                        defaultMatches={phone === null && tablet === null}
                        render={() => this.props.events.events.map((item, index) => {
                          if (index === 0) {
                            return <CardLarge item={item} key={index} desktop/>
                          } else return <CardSmall item={item} key={index} desktop/>
                        })}
              />
            </div>
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
