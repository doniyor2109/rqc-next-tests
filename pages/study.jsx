// core modules
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import cookies from 'next-cookies'

// actions
import * as studyActions from '../redux/actions/study'
import * as langActions from '../redux/actions/lang'

// components
import StudyMainComponent from '../components/study'
import Loading from '../components/shared/loading'

import StudyType from '../components/study/StudyPropType'

class Study extends Component {
  static propTypes = {
    study: PropTypes.shape({
      isFetching: PropTypes.bool,
      items: StudyType.items,
    }),
    lang: PropTypes.string,
    phone: PropTypes.string,
    tablet: PropTypes.string,
    fetchStudy: PropTypes.func.isRequired,
  }

  static defaultProps = {
    study: {},
    lang: 'ru',
    phone: null,
    tablet: null,
  }

  static async getInitialProps(ctx) {
    const { reduxStore, query } = ctx
    const { fb_locale } = query
    const { language } = cookies(ctx)

    // запрос к Prismic через redux actons с добавлением контента в redux store
    try {
      const serverFetch = await studyActions.getStudyGraph(language)
      reduxStore.dispatch(studyActions.fetchStudySuccess(serverFetch))
    } catch (error) {
      return reduxStore.dispatch(studyActions.fetchStudyFailure(error))
    }
    return { fb_locale }
  }

  componentDidUpdate(prevProps) {
    const { lang, fetchStudy } = this.props
    if (lang !== prevProps.lang) {
      fetchStudy(lang)
    }
  }

  render() {
    const { study, phone, tablet, lang } = this.props

    // console.log('study', this.props);

    return (
      <>
        {study.isFetching && <Loading />}
        <StudyMainComponent
          items={study.items}
          phone={phone}
          tablet={tablet}
          lang={lang}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  const { study, language } = state
  const { lang } = state.i18nState
  return { study, lang, language }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, studyActions, langActions), dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Study)
