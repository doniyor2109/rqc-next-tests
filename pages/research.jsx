// core
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes, { string } from 'prop-types'

// actions
import * as groupsActions from '../redux/actions/scigroups'
import * as pubActions from '../redux/actions/publications'
import * as researchActions from '../redux/actions/research'
import * as langActions from '../redux/actions/lang'

// components
import ResearchHead from '../components/research/ResearchHead'
import PageDescription from '../components/research/PageDescription'
import Groups from '../components/research/Groups'
import PubsPreview from '../components/research/PubsPreview'
import ResearchPage from '../components/research/ResearchPage'

class Research extends React.Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    fetchSciGroups: PropTypes.func,
    fetchResearchPage: PropTypes.func,
    fetchPublicationsforResearch: PropTypes.func,
    lang: string,
    research: PropTypes.shape({
      isFetching: PropTypes.bool,
      page: PropTypes.shape({
        data: PropTypes.shape({
          description: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string,
            })
          ),
        }),
      }),
    }),
    scigroups: PropTypes.shape({
      isFetching: PropTypes.bool,
      groups: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
        })
      ),
    }),
    publications: PropTypes.shape({
      pubs: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.shape({
            date: PropTypes.date,
          }),
        })
      ),
    }),
    fb_locale: PropTypes.string,
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
    const { publications, fb_locale } = this.props
    return (
      <ResearchPage>
        <ResearchHead fb_locale={fb_locale} />
        <PageDescription
          page={page}
          isFetchingResearch={isFetchingResearch}
          isFetchingGroups={isFetchingGroups}
        />
        <Groups groups={groups} />
        <PubsPreview publications={publications} />
      </ResearchPage>
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
