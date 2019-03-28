//core modules
import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Head from 'next/head'


//actions
import * as aboutActions from '../redux/actions/about'
import * as langActions from '../redux/actions/lang'

//components
import Loading from '../components/shared/loading';
import ReportCard from '../components/reports/ReportCard';


//other libraries
import hostName from '../host'


class Reports extends React.Component {

    static contextTypes = {
        t: PropTypes.func
      }
    componentDidMount() {
        window.scrollTo(0,0)
        this.props.fetchAbout(this.props.lang)
    }

    componentDidUpdate(prevProps) {

        // обработка смены языка
        if (this.props.lang !== prevProps.lang) {
          this.props.fetchAbout(this.props.lang)
        }
    
      }

    render() {

        const { page, isFetching } = this.props.about
        // console.log("annual reports", this.props)
        if (isFetching) return <Loading />
        else return (
            <div className="evaluation-reports-page">
                <Head>
                <title>{this.context.t("Отчеты РКЦ")}</title>
                    <meta property="og:url"                content={hostName + "/reports"} />
                    <meta property="og:type"               content="article" />
                    <meta property="og:image"              content={hostName + "/static/oblozka.jpg"} />
                    <meta property="og:locale:alternate"   content="en_US" />
                {(typeof fb_locale === 'undefined' || this.props.fb_locale === "ru_RU") && 
                    <Fragment>
                        <meta property="og:locale"             content="ru_RU" />
                        <meta property="og:title"              content="Отчеты РКЦ" />
                        <meta property="og:description"        content="Отчеты о деятельности Российского Квантового Центра" />
                    </Fragment>
                }
                {this.props.fb_locale === "en_US" && 
                    <Fragment>
                        <meta property="og:locale"             content="en_US" />
                        <meta property="og:title"              content="Reports of the RQC" />
                        <meta property="og:description"        content="The RQC business reports" />
                    </Fragment>
                }
                </Head>

                <div className="container">
                    <h1>
                        {this.context.t("Годовые отчеты")}
                    </h1>
                    <div className="columns">
                        {page.data && page.data.body1[0].items.map((item, index) => 
                            <ReportCard item={item} key={index} />
                        )}          
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { about } = state
    const { lang } = state.i18nState
    return { about, lang }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        aboutActions, 
        langActions
        ), dispatch);
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Reports)
  