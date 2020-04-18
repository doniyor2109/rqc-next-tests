//core modules
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import Router from 'next/router'
import Head from 'next/head'

//actions
import * as articleActions from '../redux/actions/article'
import {
  fetchArticleByUidRequest,
  fetchArticleByUidSuccess,
  fetchArticleByUidFailure,
} from '../redux/actions/article'
import * as langActions from '../redux/actions/lang'
import * as relatedActions from '../redux/actions/articleRelated'

//components
import ArticleHead from '../components/article/ArticleHead'
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
import PrismicConfig from '../prismic-configuration'
import moment from 'moment'
import 'moment/locale/ru'
import hostName from '../host'

class Article extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    fetchArticleByUid: PropTypes.func.isRequired,
    lang: PropTypes.string,
    contentLang: PropTypes.string,
    switchLanguageProgrammatically: PropTypes.func,
    language: PropTypes.shape({
      userClicked: PropTypes.number,
    }),
    phone: PropTypes.string,
    tablet: PropTypes.string,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  static async getInitialProps(ctx) {
    const {
      reduxStore,
      query: { uid },
    } = ctx
    var contentLang = ''

    reduxStore.dispatch(fetchArticleByUidRequest(uid))
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    await api
      .query(Prismic.Predicates.at('my.news.uid', uid), { lang: '*' })
      .then(response => {
        reduxStore.dispatch(fetchArticleByUidSuccess(uid, response))
        // из ответа API Prismic берем значение языка, на котором создан контент
        // и потом передаем его в props.
        // Это нужно для странных случаев, когда язык, например, "ru", но
        // но пользователь открывает ссылку вида .../article/nils-bohr-institue
        // которая явно предполагает наличие английского языка в интерфейсе
        contentLang = response.results[0].lang
      })
      .catch(error => reduxStore.dispatch(fetchArticleByUidFailure(uid, error)))
    return { uid, contentLang }
  }

  state = {
    modalActive: false,
  }

  componentDidMount() {
    const { lang, contentLang, switchLanguageProgrammatically } = this.props
    if (contentLang !== lang) {
      switchLanguageProgrammatically(contentLang)
    }
  }

  componentDidUpdate(prevProps) {
    // если глобально меняется язык и мы знаем, что он поменялся в результате
    // действий пользователя (userClicked), то редиректим пользователя на страницу с другим uid
    // если бы мы не было флага userClicked, то компонент бы уходил в бесконечный цикл
    // из-за изменения языка в componentDidMount()
    const { lang, language, article } = this.props
    if (
      lang !== prevProps.lang &&
      language.userClicked !== prevProps.language.userClicked
    ) {
      if (article.item.alternate_languages.length > 0) {
        Router.push(
          '/article/' + this.props.article.item.alternate_languages[0].uid
        )
      } else {
        this.setState({ modalActive: true })
      }
    }
  }

  render() {
    const { article, phone, tablet, fb_locale } = this.props
    console.log('article', this.props)
    if (this.props.lang === 'ru') {
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

        return ''
      })
    }

    return (
      <Fragment>
        {article.item && <ArticleHead item={article.item} />}
        <Head>
          <title>
            {article.item.data.title[0] && article.item.data.title[0].text}
          </title>
          <meta
            property="og:url"
            content={hostName + '/article/' + this.props.uid}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content={
              article.item.data.title[0] && article.item.data.title[0].text
            }
          />
          <meta
            property="og:description"
            content={
              article.item.data.title_description[0] &&
              article.item.data.title_description[0].text
            }
          />
          <meta
            property="og:image"
            content={article.item.data.cover && article.item.data.cover.url}
          />
          <meta
            property="og:image:width"
            content={
              article.item.data.cover &&
              article.item.data.cover.dimensions.width
            }
          />
          <meta
            property="og:image:height"
            content={
              article.item.data.cover &&
              article.item.data.cover.dimensions.height
            }
          />
        </Head>

        <PopupNoTranslation
          active={this.state.modalActive}
          click={this.click}
        />

        {/* тело новости */}
        {article.item.data && (
          <Fragment>
            <Media
              query="(min-width: 769px)"
              defaultMatches={phone === null && tablet === null}
              render={() => (
                <ArticleHero
                  backImage={article.item.data.cover.url}
                  tags={article.item.tags}
                  date={moment(
                    article.item.data.manual_date_of_publication
                  ).format('LL')}
                  title={article.item.data.title}
                />
              )}
            />
            <Media
              query="(min-width: 416px) and (max-width:768px)"
              defaultMatches={tablet !== null}
              render={() => (
                <ArticleHero
                  backImage={article.item.data.cover.ipad.url}
                  tags={article.item.tags}
                  date={moment(
                    article.item.data.manual_date_of_publication
                  ).format('LL')}
                  title={article.item.data.title}
                />
              )}
            />
            <Media
              query="(max-width:415px)"
              defaultMatches={phone !== null}
              render={() => (
                <ArticleHero
                  backImage={article.item.data.cover.iphone.url}
                  tags={article.item.tags}
                  date={moment(
                    article.item.data.manual_date_of_publication
                  ).format('LL')}
                  title={article.item.data.title}
                />
              )}
            />

            <ArticleBody
              lead={article.item.data.title_description}
              content={articleContent}
            />
          </Fragment>
        )}

        {article.item.data && (
          <div className="container">
            <div className="columns">
              <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
                <Socials
                  url={hostName + '/article/' + this.props.uid}
                  quote={article.item.data.title[0].text}
                  image={article.item.data.cover.url}
                />
              </div>
            </div>
          </div>
        )}

        {/* MORE NEWS для трех версий */}
        {article.item.tags && (
          <Media
            query="(min-width: 769px)"
            defaultMatches={phone === null && tablet === null}
            render={() => (
              <MoreNews
                fetchNewsByTag={this.props.morenewsByTag}
                relatedTo={article.item.id}
                tags={article.item.tags}
                numberOfArticles={3}
                articles={this.props.related.articles}
                isFetching={this.props.related.isFetching}
                nextPage={this.props.related.nextPage}
                lang={this.props.lang}
              />
            )}
          />
        )}
        {article.item.tags && (
          <Media
            query="(min-width: 416px) and (max-width:768px)"
            defaultMatches={tablet !== null}
            render={() => (
              <MoreNews
                fetchNewsByTag={this.props.morenewsByTag}
                relatedTo={article.item.id}
                tags={article.item.tags}
                numberOfArticles={2}
                articles={this.props.related.articles}
                isFetching={this.props.related.isFetching}
                nextPage={this.props.related.nextPage}
                lang={this.props.lang}
              />
            )}
          />
        )}
        {article.item.tags && (
          <Media
            query="(max-width:415px)"
            defaultMatches={phone !== null}
            render={() => (
              <MoreNews
                fetchNewsByTag={this.props.morenewsByTag}
                relatedTo={article.item.id}
                tags={article.item.tags}
                numberOfArticles={3}
                articles={this.props.related.articles}
                isFetching={this.props.related.isFetching}
                nextPage={this.props.related.nextPage}
                lang={this.props.lang}
              />
            )}
          />
        )}
      </Fragment>
    )
  }

  click = () => {
    Router.push('/news')
  }
}

const mapStateToProps = state => {
  const { article, related, language } = state
  const { lang } = state.i18nState
  return { article, lang, language, related }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}, articleActions, langActions, relatedActions),
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
