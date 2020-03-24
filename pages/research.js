// core
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Link from 'next/link'

// actions
import * as groupsActions from '../redux/actions/scigroups'
import * as pubActions from '../redux/actions/publications'
import * as researchActions from '../redux/actions/research'
import * as langActions from '../redux/actions/lang'

// components

import ResearchHead from '../components/research/ResearchHead'
import Publication from '../components/publications/Publication'
import MainCategory from '../components/shared/styled/MainCategory'
import PageDescription from '../components/research/PageDescription'
import Groups from '../components/research/Groups'

class Research extends React.Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  componentDidMount() {
    const {
      fetchSciGroups,
      fetchResearchPage,
      fetchPublicationsforResearch,
      lang,
    } = this.props
    fetchSciGroups(lang)
    fetchResearchPage(lang)
    fetchPublicationsforResearch(lang, 3)
  }

  componentDidUpdate(prevProps) {
    const { hash } = window.location
    const elmnt = document.getElementById(hash.slice(1))
    if (elmnt) {
      elmnt.scrollIntoView()
    }
    const {
      fetchSciGroups,
      fetchResearchPage,
      fetchPublicationsforResearch,
      lang,
    } = this.props
    if (this.props.lang !== prevProps.lang) {
      fetchSciGroups(lang)
      fetchResearchPage(lang)
      fetchPublicationsforResearch(lang, 3)
    }
  }

  render() {
    const { page, isFetching: isFetchingResearch } = this.props.research
    const { isFetching: isFetchingGroups, groups } = this.props.scigroups

    return (
      <Fragment>
        <ResearchHead fb_locale={this.props.fb_locale} />
        <PageDescription
          page={page}
          isFetchingResearch={isFetchingResearch}
          isFetchingGroups={isFetchingGroups}
        />
        <Groups groups={groups} />

        <section className="research-publications">
          <div className="container">
            <MainCategory>{this.context.t('Публикации')}</MainCategory>
            <div className="columns is-multiline">
              <div className="column is-12-tablet is-8-desktop is-offset-2-desktop ">
                {this.props.publications.pubs.map((pub, index) => (
                  <Publication key={index} item={pub} />
                ))}
              </div>
            </div>
            <div className="columns is-multiline">
              <div className="column is-12 is-centered">
                <Link href="/publications">
                  <div className="more-wrapper">
                    <button className="more-text">
                      {this.context.t('Все публикации')}
                    </button>
                    <img src="/static/more.svg" alt="more groups" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { scigroups, research, publications } = state
  const { lang } = state.i18nState
  return {
    scigroups,
    research,
    lang,
    publications,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    Object.assign({}, groupsActions, langActions, researchActions, pubActions),
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Research)
