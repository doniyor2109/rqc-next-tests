import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Media from 'react-media'
import cookies from 'next-cookies'

import * as mainActions from '../redux/actions/main'
import * as langActions from '../redux/actions/lang'
import * as eventsActions from '../redux/actions/events'
import * as newsActions from '../redux/actions/news'
import * as productsActions from '../redux/actions/products'


import {fetchMainRequest, 
        fetchMainSuccess, 
        fetchMainFailure} from '../redux/actions/main'

import MainSlider from '../components/main/MainSlider'
import SciSlider from '../components/main/SciSlider'
import {Loading} from '../components/shared/loading'
import OldSite from '../components/oldSite.js'
import Products from '../components/main/Products'
import NewsTeaser from '../components/main/NewsTeaser'
import Scientists from '../components/main/Scientists'


import {CardLarge} from '../components/events/CardLarge'
import {CardSmall} from '../components/events/CardSmall'
import MainHead from '../components/main/MainHead'

import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration';

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
                                          { lang: language})
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

    const { fetchNews, fetchEvents, fetchMainSciSlider, fetchProducts, lang } = this.props
    
    this.setState({
      DOMLoaded: true
    })
    fetchProducts(lang)
    fetchMainSciSlider(lang)
    fetchEvents(lang, 2)
    fetchNews(lang, 3) 
  }

  componentDidUpdate(prevProps) {

    const { fetchNews, fetchMain, fetchEvents, fetchMainSciSlider, fetchProducts, lang } = this.props

    if (lang !== prevProps.lang) {
      if (lang === "en-gb"){
        fetchMain('W3GV8SQAACQAZAwG', "en-gb")
      } else if(this.props.lang === "ru") {
        this.props.fetchMain('W3GVDyQAACYAZAgb', "ru")
      }
      fetchProducts(lang)
      fetchMainSciSlider(lang)
      fetchEvents(lang, 2)
      fetchNews(lang, 3) 
    }
  }

  render() {
    const { DOMLoaded } = this.state
    const { phone, tablet, news, main, fb_locale, products } = this.props
    const { sciSlider, isFetchingMain, isFetchingSci } = this.props.main

    console.log("main", this.props)
    if (!DOMLoaded) return <Loading />
    else 
    return (
      <Fragment>
        <MainHead fb_locale={fb_locale} />
        <section className="main-slider">
          {main.data && <MainSlider slides={main.data.body}
                                          isLoading={isFetchingMain}
                                          phone={phone}
                                          tablet={tablet}
                                /> }
        </section>

        <OldSite />

        <NewsTeaser articles={news.articles} phone={phone} tablet={tablet} />

        <Products items={products.items}/>

        {/* <Scientists /> */}

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
  const { main, events, news, products } = state
  const { lang } = state.i18nState
  return { main, lang, events, news, products }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
      mainActions,
      langActions,
      eventsActions,
      newsActions,
      productsActions
    ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Index)
