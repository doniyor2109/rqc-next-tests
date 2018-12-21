import React, {Fragment} from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import * as vacanciesActions from '../../redux/actions/vacancies'
import * as langActions from '../../redux/actions/lang'
import { Loading } from '../shared/loading'
import VacancyCard from './VacancyCard'
import VacancyPopup from './VacancyPopup'
import '../../scss/vacancies.scss'


class Vacancies extends React.Component {

    state = {
        popupKey: -1,
        vacanciesNumberDesktop: 6, 
        vacanciesNumberTablet: 4, 
        vacanciesNumberMobile: 3, 
        moreVacanciesButtonPresent: true, 
        cardoffsetTop: 0

    }

    componentDidMount() {
        this.props.fetchVacancies(this.props.language.currentLanguage)
    }

    render() {

        const { vacancies, isFetching, phone, tablet } = this.props
        if (isFetching) return <Loading />
        else return (
            <section className="vacancies">
                <div className="container">
                    <h1>{this.context.t("Работа у нас")}</h1>
                    <p className="vac_description">{this.context.t("Присоединяйтесь к команде RQC")}! 
                    <br />
                    {this.context.t("Чтобы откликнуться на вакансию, присылайте резюме на почту")}:&nbsp; 
                    <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a></p>
                    <div className="columns is-multiline">

                    <Media  query="(min-width: 769px)"
                            defaultMatches={phone === null && tablet === null}
                            render={() =>  vacancies.items.slice(0, this.state.vacanciesNumberDesktop).map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <VacancyCard item={item} onClick={this.handleClick} cardNumber={index} />
                                                        <VacancyPopup key={index} item={item} active={this.state.popupKey === index} close={this.popupClose}/>
                                                    </Fragment>
                                                )
                                            })
                                    } 
                    />

                    <Media  query="(min-width: 416px) and (max-width: 768px)"
                            defaultMatches={tablet !== null}
                            render={() =>  vacancies.items.slice(0, this.state.vacanciesNumberTablet).map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <VacancyCard item={item} onClick={this.handleClick} cardNumber={index} />
                                                        <VacancyPopup key={index} item={item} active={this.state.popupKey === index} close={this.popupClose}/>
                                                    </Fragment>
                                                )
                                            })
                                    } 
                    />
                
                    <Media  query="(max-width: 415px)"
                            defaultMatches={phone !== null}
                            render={() =>  vacancies.items.slice(0, this.state.vacanciesNumberMobile).map((item, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <VacancyCard item={item} onClick={this.handleClick} cardNumber={index} />
                                                        <VacancyPopup key={index} item={item} active={this.state.popupKey === index} close={this.popupClose}/>
                                                    </Fragment>
                                                )
                                            })
                                    } 
                    />

                    </div>
                    {(vacancies.items.length > 6) && this.state.moreVacanciesButtonPresent &&
                        <div className="button-wraper">
                            <img src="/static/more.svg" onClick={e => {this.moreVacancies(e)}} />
                        </div>
                    }
                </div>
            </section>
        )
    }

    moreVacancies = (e) => {
        e.preventDefault()
        this.setState({
            vacanciesNumberDesktop: this.props.vacancies.items.length, 
            vacanciesNumberTablet: this.props.vacancies.items.length, 
            vacanciesNumberMobile: this.props.vacancies.items.length, 
            moreVacanciesButtonPresent: false
        })
    }

    handleClick = (e, cardNumber, offset) => {
        e.preventDefault()
        this.setState({
            popupKey: cardNumber, 
            cardoffsetTop: offset
        })
        document.body.classList.add('noscroll')
    }
    popupClose = (e) => {
        e.preventDefault()
        this.setState({popupKey: -1})
        document.body.classList.remove('noscroll')
        const vac = document.getElementById("vacancies").offsetTop + this.state.cardoffsetTop
        window.scrollTo({
            top: vac, 
            behavior: "smooth"
        })
    }
}


const mapStateToProps = state => {
    const { vacancies, language } = state
    const { lang } = state.i18nState
    return { vacancies, lang, language }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        vacanciesActions, 
        langActions
        ), dispatch);
}

Vacancies.contextTypes = {
    t: PropTypes.func
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Vacancies)
  