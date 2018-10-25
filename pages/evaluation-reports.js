//core modules
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'


//actions
import * as aboutActions from '../redux/actions/about'
import * as langActions from '../redux/actions/lang'

//components
import { Loading } from '../components/shared/loading'
import ReportCard from '../components/reports/ReportCard';


//other libraries

class EvalReportsPage extends React.Component {

    static contextTypes = {
        t: PropTypes.func
      }
    componentDidMount() {
        this.props.fetchAbout(this.props.language.currentLanguage)
    }

    componentDidUpdate(prevProps) {

        // обработка смены языка
        if (this.props.language.currentLanguage !== prevProps.language.currentLanguage) {
          this.props.fetchAbout(this.props.language.currentLanguage)
        }
    
      }

    render() {

        const { page, isFetching } = this.props.about
        // console.log("annual reports", this.props)
        if (isFetching) return <Loading />
        else return (
            <div className="evaluation-reports-page">
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
    const { about, language } = state
    const { lang } = state.i18nState
    return { about, lang, language }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        aboutActions, 
        langActions
        ), dispatch);
}

  
export default connect(mapStateToProps, mapDispatchToProps)(EvalReportsPage)
  