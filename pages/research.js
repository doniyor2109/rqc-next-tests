//core
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Media from 'react-media'

//actions
import * as groupsActions from '../redux/actions/scigroups'
import * as pubActions from '../redux/actions/publications'
import * as researchActions from '../redux/actions/research'
import * as langActions from '../redux/actions/lang'

//components
import { Loading } from '../components/shared/loading.js'
import htmlSerializer from '../components/shared/htmlSerializer'
import SciCard from '../components/research/SciCard'
import ResearchHead from '../components/research/ResearchHead'
import Publication from '../components/publications/Publication'

// other libs
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../prismic-configuration';

class Research extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        numberOfGroups: 6,
        numberOfGroupsMob: 3
    }
    
    componentDidMount() {
        this.props.fetchSciGroups(this.props.lang)
        this.props.fetchResearchPage(this.props.lang)
        this.props.fetchPublications(this.props.lang, 3, this.state.pageNumber, "SORT_DATE")

    }

    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            this.props.fetchSciGroups(this.props.lang)
            this.props.fetchResearchPage(this.props.lang)
            this.props.fetchPublications(this.props.lang, 3, this.state.pageNumber, "SORT_DATE")
        }
    }



    render() {
        const { phone, tablet } = this.props
        const { page } = this.props.research
        const { isFetching, groups } = this.props.scigroups

        console.log("research", this.props)
        if (isFetching) return <Loading />
        else return (
            <Fragment>
                <ResearchHead fb_locale={this.props.fb_locale}/>

                <section className="research-page">
                    <div className="container">
                        <h1 className="page-main-heading">
                            {this.context.t("Исследования")}
                        </h1>

                        <div className="columns">
                            <div className="column is-8-desktop">
                                {page && page.data && 
                                    RichText.render(page.data.description, PrismicConfig.linkResolver, htmlSerializer)
                                }
                            </div>
                        </div>
                    </div>
                </section>     

                <section className="groups">
                    <div className="container">
                        <p className="main-category">
                            {this.context.t("Научные группы")}
                        </p>

                        <div className="columns is-multiline">
                            <Media  query="(max-width: 415px)"
                                    defaultMatches={phone !== null}
                                    render={() => <Fragment>
                                                        {groups.slice(0, this.state.numberOfGroupsMob)
                                                            .map((group, index) => <SciCard group={group} key={index} />)}             
                                                </Fragment> 
                                            }
                            />

                            <Media  query="(min-width: 416px)"
                                    defaultMatches={phone === null}
                                    render={() => <Fragment>
                                                        {groups.slice(0, this.state.numberOfGroups)
                                                            .map((group, index) => <SciCard group={group} key={index} />)}          
                                                </Fragment>
                                            }
                            />
                        </div>

                        <div className="columns is-multiline">
                            <div className="column is-12 is-centered">
                                {this.state.numberOfGroups < this.props.scigroups.groups.length 
                                && <Fragment>
                                        <hr className="more" />
                                        <div className="more-wrapper" onClick={e => this.moreGroups(e)}>
                                            <button className='more-text'>
                                                {this.context.t("Все группы")}
                                            </button>
                                            <img src="/static/more.svg" alt="more groups"/>
                                        </div> 
                                  </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <section className="research-publications">
                    <div className="container">
                        <p className="main-category">
                            {this.context.t("Публикации")}
                        </p>
                        <div className="columns is-multiline">
                            <div className="column is-12-tablet is-8-desktop is-offset-2-desktop ">
                                {this.props.publications.pubs.map((pub, index) => <Publication key={index} pub={pub} />)}
                            </div>
                        </div>
                        <div className="columns is-multiline">
                            <div className="column is-12 is-centered">
                                <Link href="/publications">
                                    <div className="more-wrapper">
                                        <button className='more-text'>
                                            {this.context.t("Все публикации")}
                                        </button>
                                        <img src="/static/more.svg" alt="more groups"/>
                                    </div> 
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </Fragment>
        )
    }

    moreGroups = (e) => {
        e.preventDefault()
        this.setState({
            numberOfGroups: this.props.scigroups.groups.length,
            numberOfGroupsMob: this.props.scigroups.groups.length
        })
    }
}


const mapStateToProps = state => {
    const { scigroups, research, publications } = state
    const { lang } = state.i18nState
    return { scigroups, research, lang, publications }
  }

  
const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        groupsActions, 
        langActions, 
        researchActions,
        pubActions
        ), dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Research)
  