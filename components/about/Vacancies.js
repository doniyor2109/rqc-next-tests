import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import * as vacanciesActions from '../../redux/actions/vacancies'
import Loading from '../shared/loading'
import VacanciesPrismic from './VacanciesPrismic'
import VacanciesHH from './VacanciesHH'


class Vacancies extends React.Component {

    state = {
        popupKey: -1,
        vacanciesNumberDesktop: 6, 
        vacanciesNumberTablet: 4, 
        vacanciesNumberMobile: 3, 
        moreVacanciesButtonPresent: true, 
        cardoffsetTop: 0,
    }

    componentDidMount() {

        if(this.props.lang === "en-gb") {
            this.props.fetchVacancies(this.props.lang)
        } else {
            this.props.fetchVacanciesHH()
        }
    }

    componentDidUpdate(prevProps) {
        // обработка смены языка
        if (this.props.lang !== prevProps.lang) {
            if(this.props.lang === "en-gb") {
                this.props.fetchVacancies(this.props.lang)
            } else {
                this.props.fetchVacanciesHH()
            }
        }
    }

    render() {

        const { vacancies, phone, tablet } = this.props
        if (vacancies.isFetchingPrismic || vacancies.isFetchingManyHH) return <Loading />
        else return (
            <section className="vacancies">
                <div className="container">
                    <h1>{this.context.t("Работа у нас")}</h1>
                    <p className="vac_description">{this.context.t("Присоединяйтесь к команде RQC")}! 
                    <br />
                    {this.context.t("Чтобы откликнуться на вакансию, присылайте резюме на почту")}:&nbsp; 
                    <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a></p>
                    <div className="columns is-multiline">
                        {this.props.lang === 'en-gb' 
                        ? <VacanciesPrismic vacancies={vacancies}
                                            popupKey={this.state.popupKey}
                                            vacanciesNumberDesktop={this.state.vacanciesNumberDesktop} 
                                            vacanciesNumberTablet={this.state.vacanciesNumberTablet} 
                                            vacanciesNumberMobile={this.state.vacanciesNumberMobile}
                                            moreVacanciesButtonPresent={this.state.moreVacanciesButtonPresent}
                                            cardoffsetTop={this.state.cardoffsetTop}
                                            moreVacancies={this.moreVacancies}
                                            handleClick={this.handleClick}
                                            popupClose={this.popupClose}
                                            phone={phone}
                                            tablet={tablet}
                           />
                        : <VacanciesHH  vacancies={vacancies}
                                        popupKey={this.state.popupKey}
                                        vacanciesNumberDesktop={this.state.vacanciesNumberDesktop} 
                                        vacanciesNumberTablet={this.state.vacanciesNumberTablet} 
                                        vacanciesNumberMobile={this.state.vacanciesNumberMobile}
                                        moreVacanciesButtonPresent={this.state.moreVacanciesButtonPresent}
                                        cardoffsetTop={this.state.cardoffsetTop}
                                        moreVacancies={this.moreVacancies}
                                        handleClick={this.handleClick}
                                        popupClose={this.popupClose}
                                        phone={phone}
                                        tablet={tablet}
                            />

                        }
                    </div>
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
            behavior: "auto"
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
        ), dispatch);
}

Vacancies.contextTypes = {
    t: PropTypes.func
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Vacancies)
  