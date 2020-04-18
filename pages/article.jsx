//core modules
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Router from 'next/router'

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
import Article from '../components/article'

import PopupNoTranslation from '../components/article/PopupNoTranslation'

// other libraries
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration'

class ArticlePage extends Component {
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
    const {
      article,
      phone,
      tablet,
      lang,
      uid,
      morenewsByTag,
      related,
    } = this.props
    // console.log('article', this.props)

    return (
      <>
        {article.item && (
          <>
            <ArticleHead item={article.item} />
            <PopupNoTranslation
              active={this.state.modalActive}
              click={this.click}
            />
            <Article
              article={article}
              phone={phone}
              tablet={tablet}
              lang={lang}
              uid={uid}
              morenewsByTag={morenewsByTag}
              related={related}
            />
          </>
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
