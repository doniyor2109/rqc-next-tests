//core
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Head from 'next/head'

//actions
import * as groupsActions from '../redux/actions/scigroups'
import * as researchActions from '../redux/actions/research'
import * as langActions from '../redux/actions/lang'

//components
import { Loading } from '../components/shared/loading.js'
import htmlSerializer from '../components/shared/htmlSerializer'
import SciCard from '../components/scigroups/SciCard'

// other libs
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../prismic-configuration';
import hostName from '../host'

class Research extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }
    
    componentDidMount() {
        this.props.fetchSciGroups(this.props.lang)
        this.props.fetchResearchPage(this.props.lang)
    }

    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            this.props.fetchSciGroups(this.props.lang)
            this.props.fetchResearchPage(this.props.lang)
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

                <section className="research-page">
                    {/* <Head>
                        <title>{this.context.t("Исследования")}</title>
                        <meta property="og:url"                content={hostName + "/people"} />
                        <meta property="og:type"               content="article" />
                        <meta property="og:image"              content={hostName + "/static/unusov.png"} />
                        <meta property="og:locale:alternate"   content="en_US" />
                    {(typeof fb_locale === 'undefined' || this.props.fb_locale === "ru_RU") && 
                        <Fragment>
                            <meta property="og:locale"             content="ru_RU" />
                            <meta property="og:title"              content="Коллектив Центра" />
                            <meta property="og:description"        content="Администрация, Попечительский и Научный совет Российского Квантового Центра" />
                        </Fragment>
                    }
                    {this.props.fb_locale === "en_US" && 
                        <Fragment>
                            <meta property="og:locale"             content="en_US" />
                            <meta property="og:title"              content="Employees of the Center" />
                            <meta property="og:description"        content="Administration, Boards of Trustees, and Scientific Committee of the RQC" />
                        </Fragment>
                    }
                    </Head> */}

                    <div className="container">
                        <h1 className="page-main-heading">
                            {this.context.t("Исследования")}
                        </h1>

                        <div className="columns">
                            <div className="column is-8-desktop">
                                {page.data && 
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
                            {groups.map((group, index) => <SciCard group={group} key={index} />)}             
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    const { scigroups, research } = state
    const { lang } = state.i18nState
    return { scigroups, research, lang }
  }

  
const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        groupsActions, 
        langActions, 
        researchActions
        ), dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Research)
  