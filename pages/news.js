import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import Head from 'next/head'

import * as newsActions from '../redux/actions/news'
import * as langActions from '../redux/actions/lang'
import * as byTagActions from '../redux/actions/byTag'

import GridViewDesktop from '../components/news/GridViewDesktop'
import GridViewTablet from '../components/news/GridViewTablet'
import GridViewMobile from '../components/news/GridViewMobile'
import FilterTag from '../components/shared/FilterTag'
import MoreNews from '../components/news/MoreNews'
import hostName from '../host'


// Основной компонент, связывающий весь интерфейс страницы /news воедино
class News extends Component {

  static propTypes = {
    news: PropTypes.object.isRequired,
    fetchNews: PropTypes.func.isRequired
  }

  static contextTypes = {
    t: PropTypes.func
  }
  
  constructor(props) {
    super(props)
    this.state = {
      activeTag: "SHOW_ALL",
      firstNews: [],
      pageSize: 10, 
      pageNumber: 1, 
      nextPage: "",
      morenews_n: 0, 
      FetchFirst: true
    }
  }

  componentDidMount() {
    this.props.fetchNews(this.props.lang, this.state.pageSize, this.state.pageNumber)
  }

  componentDidUpdate(prevProps, prevState) {

    // обработка смены языка
    if (this.props.lang !== prevProps.lang) {
      this.setState({
        FetchFirst: true
      }) 
      switch (this.state.activeTag) {
        case 'SHOW_ALL':
        return this.props.fetchNews(this.props.lang, this.state.pageSize, this.state.pageNumber)
        case 'SHOW_OUR_NEWS':
        return this.props.fetchArticlesByTag(this.context.t("Новости РКЦ"), this.state.pageSize)
        case 'SHOW_WORLD_NEWS':
        return this.props.fetchArticlesByTag(this.context.t("Квантовые технологии в мире"), this.state.pageSize)
        default:
        return null
      }
    }

    // фильтр новостей по тегам
    if(this.state.activeTag !== prevState.activeTag) {
      switch(this.state.activeTag) {
       case 'SHOW_ALL':
       return this.props.fetchNews(this.props.lang, this.state.pageSize, this.state.pageNumber)
       case 'SHOW_OUR_NEWS':
       return this.props.fetchArticlesByTag(this.context.t("Новости РКЦ"), this.state.pageSize)
       case 'SHOW_WORLD_NEWS':
       return this.props.fetchArticlesByTag(this.context.t("Квантовые технологии в мире"), this.state.pageSize)
       default:
       return null
     }
   }

    // если меняются ВСЕ новости, выводим на экран их
    if (this.props.news.articles !== prevProps.news.articles) {
          this.setState({
            firstNews: this.props.news.articles, 
            nextPage: this.props.news.nextPage
          })
        } 
      
    // если меняются новости по тегам, выводим их
    if (this.props.byTag.articles !== prevProps.byTag.articles) {
    this.setState({
      firstNews: this.props.byTag.articles, 
      nextPage: this.props.byTag.nextPage
    })
  } 
   
    // нажатие на + 
    if (this.state.pageSize !== prevState.pageSize) {
      switch(this.state.activeTag) {
        case 'SHOW_ALL':
        return this.props.fetchNews(this.props.lang, this.state.pageSize, this.state.pageNumber)
        case 'SHOW_OUR_NEWS':
        return this.props.fetchArticlesByTag(this.context.t("Новости РКЦ"), this.state.pageSize)
        case 'SHOW_WORLD_NEWS':
        return this.props.fetchArticlesByTag(this.context.t("Квантовые технологии в мире"), this.state.pageSize)
        default:
        return null
      }
    }
   
  }

  render() {
    const { phone, tablet } = this.props

    // console.log("news", this.props)


      return (
        <Fragment>
          <Head>
              <title>{this.context.t("Новости")}</title>
              <meta property="og:url"                content={hostName + "/news"} />
              <meta property="og:type"               content="article" />
              <meta property="og:image"              content={hostName + "/static/qaqam.jpg"} />
              <meta property="og:locale:alternate"   content="en_US" />
          {(typeof fb_locale === 'undefined' || this.props.fb_locale === "ru_RU") && 
              <Fragment>
                  <meta property="og:locale"             content="ru_RU" />
                  <meta property="og:title"              content="Новости" />
                  <meta property="og:description"        content="Новости РКЦ, а также квантовые технологии со всего мира" />
              </Fragment>
          }
          {this.props.fb_locale === "en_US" && 
              <Fragment>
                  <meta property="og:locale"             content="en_US" />
                  <meta property="og:title"              content="News" />
                  <meta property="og:description"        content="The RQC news, as well as quantum technologies from around the world" />
              </Fragment>
          }
          </Head>
          <div className="newspage">
            <div className="container">
              <h1 className="page-main-heading">
                {this.context.t("Новости")}
              </h1>
              <p className="captions">{this.context.t("Фильтр по тегам")}</p>
              <div className="tags-for-search">
                <FilterTag onClick={e => {this.selectTag("SHOW_ALL", e)}}
                            active={this.state.activeTag === "SHOW_ALL" ? true : false}>
                  {this.context.t("Все новости")}
                </FilterTag>
                <FilterTag onClick={e => {this.selectTag("SHOW_OUR_NEWS", e)}}
                            active={this.state.activeTag === "SHOW_OUR_NEWS" ? true : false}>
                {this.context.t("Новости РКЦ")}
                </FilterTag>
                <FilterTag onClick={e => {this.selectTag("SHOW_WORLD_NEWS", e)}}
                            active={this.state.activeTag === "SHOW_WORLD_NEWS" ? true : false}>
                  {this.context.t("Квантовые технологии в мире")}
                </FilterTag>
              </div>

              <Media  query="(max-width: 415px)"
                      defaultMatches={phone !== null}
                      render={() => <Fragment>
                                      <GridViewMobile news={this.state.firstNews}
                                                      isFetching={(this.props.news.isFetching || this.props.byTag.isFetching) && this.state.FetchFirst} />

                                      <MoreNews nextPage={this.state.nextPage}
                                                give_me_more_news={this.give_me_more_news}
                                                numberOfMoreNews={3}
                                                isFetching={(this.state.pageSize > 10) && (this.props.news.isFetching || this.props.byTag.isFetching)}
                                      />
                                    </Fragment>
                              }
              />

              <Media  query="(min-width: 416px) and (max-width: 768px)"
                      defaultMatches={tablet !== null}
                      render={() => <Fragment>
                                      <GridViewTablet news={this.state.firstNews}
                                                      isFetching={(this.props.news.isFetching || this.props.byTag.isFetching) && this.state.FetchFirst} />

                                      <MoreNews nextPage={this.state.nextPage}
                                                give_me_more_news={this.give_me_more_news}
                                                numberOfMoreNews={2}
                                                isFetching={(this.state.pageSize > 10) && (this.props.news.isFetching || this.props.byTag.isFetching)}
                                      />
                                    </Fragment>
                              }
              />

              <Media  query="(min-width: 769px)"
                      defaultMatches={phone === null && tablet === null}
                      render={() => <Fragment>
                                      <GridViewDesktop news={this.state.firstNews}
                                                       isFetching={(this.props.news.isFetching || this.props.byTag.isFetching) && this.state.FetchFirst} />
                                      <MoreNews nextPage={this.state.nextPage}
                                                give_me_more_news={this.give_me_more_news}
                                                numberOfMoreNews={3}
                                                isFetching={(this.state.pageSize > 10) && (this.props.news.isFetching || this.props.byTag.isFetching)}
                                      />
                                    </Fragment>
                              }
              />
            </div>
          </div>
        </Fragment>
      )}

    selectTag = (tag, e) => {
      e.preventDefault();
      this.setState({
        activeTag: tag, 
        FetchFirst: true
      })
    }

    give_me_more_news = (e, numberOfMoreNews) => {
      e.preventDefault()
      this.setState({
        pageSize: this.state.pageSize + numberOfMoreNews, 
        morenews_n: numberOfMoreNews, 
        FetchFirst: false
      }) 
    }
  }
  

// Redux функции state и dispatch
const mapStateToProps = state => {
  const { news, byTag } = state
  const { lang } = state.i18nState
  return { news, lang, byTag }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
      newsActions,
      byTagActions,
      langActions,
    ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(News)
