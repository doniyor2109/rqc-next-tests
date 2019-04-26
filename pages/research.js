//core
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Link from 'next/link'

//actions
import * as groupsActions from '../redux/actions/scigroups'
import * as pubActions from '../redux/actions/publications'
import * as researchActions from '../redux/actions/research'
import * as langActions from '../redux/actions/lang'

//components
import Loading from '../components/shared/loading';
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
    
    componentDidMount() {

        this.props.fetchSciGroups(this.props.lang)
        this.props.fetchResearchPage(this.props.lang)
        this.props.fetchPublicationsforResearch(this.props.lang, 3)

    }

    componentDidUpdate(prevProps) {
        const { hash } = window.location;
        const elmnt = document.getElementById(hash.slice(1));
        if (elmnt) {
          elmnt.scrollIntoView();
        }
        if (this.props.lang !== prevProps.lang) {
            this.props.fetchSciGroups(this.props.lang)
            this.props.fetchResearchPage(this.props.lang)
            this.props.fetchPublicationsforResearch(this.props.lang, 3)
        }
    }

    render() {
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

                <section className="groups" >
                    <div id="groups" className="container" >
                        <p className="main-category">
                            {this.context.t("Научные группы")}
                        </p>

                        <div className="columns is-multiline">
                            {groups.map((group, index) => <SciCard group={group} key={index} />)}             
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
                                {this.props.publications.pubs.map((pub, index) => <Publication key={index} item={pub} />)}
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
  