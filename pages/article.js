//core modules
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import Router from 'next/router'
import Head from 'next/head'
import cookies from 'next-cookies'

//actions
import * as articleActions from '../redux/actions/article'
import {fetchArticleByUidRequest, fetchArticleByUidSuccess, fetchArticleByUidFailure, fetchArticleByUid } from '../redux/actions/article'
import * as langActions from '../redux/actions/lang'
import * as byTagActions from '../redux/actions/byTag'

//components
import { Loading } from '../components/shared/loading.js'
import ArticleBody from '../components/article/ArticleBody'
import ArticleHero from '../components/article/ArticleHero'
import BigImageSlice from '../components/article/BigImageSlice'
import QuoteSlice from '../components/article/QuoteSlice'
import TextSlice from '../components/article/TextSlice'
import PopupNoTranslation from '../components/article/PopupNoTranslation'
import MoreNews from '../components/article/MoreNews'
import Socials from '../components/shared/Socials'

// other libraries
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration';
import moment from 'moment'
import 'moment/locale/ru'
import hostName from '../host'

class Article extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired,
    fetchArticleByUid: PropTypes.func.isRequired
  }

  static contextTypes = {
    t: PropTypes.func
  }

  static async getInitialProps (ctx) {

    const {reduxStore, query: { uid }} = ctx
    const { language } = cookies(ctx)

    reduxStore.dispatch(fetchArticleByUidRequest(uid))
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    await api.query(Prismic.Predicates.at('my.news.uid', uid), { lang : "*" })
             .then(response => reduxStore.dispatch(fetchArticleByUidSuccess(uid, response)))
             .catch(error => reduxStore.dispatch(fetchArticleByUidFailure(uid, error)))
    return {uid}
  }
  
  state = {
      modalActive: false
    }

  componentDidUpdate(prevProps, prevState) {

    // если глобально меняется язык, то редиректим пользователя на страницу с другим uid
    if (this.props.lang !== prevProps.lang) {
      if (this.props.article.item.alternate_languages.length > 0) {
        Router.push('/article/' + this.props.article.item.alternate_languages[0].uid)
        }
      else {this.setState({modalActive: true})}
      }

    // если внутри страницы пользователь кликает на другой компонент, который меняет location,
    // то есть ведет на другую «страницу»,то мы сначала загружаем контент
    if (this.props.uid !== prevProps.uid) {
      this.props.fetchArticleByUid(this.props.uid, "*")
    }

  }

  render() {

    const { article, phone, tablet } = this.props
    console.log("article",  this.props)
    if (this.props.lang === "ru") {
      moment.locale('ru')
    } else moment.locale('en')

    // готовим разные элементы DOM в зависимости от разных slices полученных от Prismic
    var articleContent = []
    if (article.item.data) {

      // Определяем верстку для каждого типа slice
      articleContent = article.item.data.body.map((slice, index) => {

        // верстка для текста
        if (slice.slice_type === 'text') {
          return <TextSlice slice={slice} key={index} />
         }

         // верстка для цитат
        if (slice.slice_type === 'author-quote') {
           return <QuoteSlice slice={slice} key={index} />
        }

          // верстка для больших картинок
        if (slice.slice_type === 'image-description') {
            return <BigImageSlice slice={slice} key={index} />
        }
        
        return ""
       })
    }

    // показываем анимацию в момент загрузки новости
    if (article.isFetching) {
        return <Loading />
        } else return (

      <Fragment>
        <Head>
          <title>{article.item.data.title[0].text}</title>
          <meta property="og:url"                content={hostName + "/article" + this.props.uid} />
          <meta property="og:type"               content="article" />
          <meta property="og:title"              content={article.item.data.title[0].text} />
          <meta property="og:description"        content={article.item.data.title_description[0].text} />
          <meta property="og:image"              content={article.item.data.cover.url}  />
        </Head>

        <PopupNoTranslation active={this.state.modalActive} click={this.click} />

        {/* тело новости */}
        {article.item.data && 
          <Fragment>
            <ArticleHero  backImage={article.item.data.cover.url} 
                          tags={article.item.tags} 
                          date={moment(article.item.data.manual_date_of_publication).format('LL')} 
                          title={article.item.data.title} 
            />

            <ArticleBody lead={article.item.data.title_description} content={articleContent} />
          </Fragment>
        }

        {article.item.data && 
          <div className="container">
            <div className="columns">
              <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
                  <Socials url={hostName + "/article/" + this.props.uid} 
                           quote={article.item.data.title[0].text}
                           image={article.item.data.cover.url}
                  />    
              </div>
            </div>
          </div>    
        }
          
        {/* MORE NEWS для трех версий */}
        {article.item.tags &&
          <Media  query="(min-width: 769px)"
                  defaultMatches={phone === null && tablet === null}
                  render={() => <MoreNews fetchNewsByTag={this.props.fetchArticlesByTag} 
                                          tags={article.item.tags} 
                                          numberOfArticles={3}
                                          articles={this.props.byTag.articles}
                                          isFetching={this.props.byTag.isFetching}
                                          nextPage={this.props.byTag.nextPage}
                                          lang={this.props.lang}
                                />
                          }
          />
        }
        {article.item.tags && 
          <Media  query="(min-width: 416px) and (max-width:768px)"
                  defaultMatches={tablet !== null}
                  render={() => <MoreNews fetchNewsByTag={this.props.fetcharticlesByTag} 
                                          tags={article.item.tags} 
                                          numberOfArticles={2}
                                          articles={this.props.byTag.articles}
                                          isFetching={this.props.byTag.isFetching}
                                          nextPage={this.props.byTag.nextPage}
                                          lang={this.props.lang}
                                />
                          }
          />
        }
        {article.item.tags && 
          <Media  query="(max-width:415px)"
                  defaultMatches={phone !== null}
                  render={() => <MoreNews fetchNewsByTag={this.props.fetchArticlesByTag} 
                                          tags={article.item.tags} 
                                          numberOfArticles={3}
                                          articles={this.props.byTag.articles}
                                          isFetching={this.props.byTag.isFetching}
                                          nextPage={this.props.byTag.nextPage}
                                          lang={this.props.lang}
                                />
                          }
          />
        }
      </Fragment>
    )
  }

  click = () => {
    Router.push('/news')
  }
}

const mapStateToProps = state => {
  const { article, byTag } = state
  const { lang } = state.i18nState
  return { article, lang, byTag }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
      articleActions,
      langActions,
      byTagActions
    ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Article)
