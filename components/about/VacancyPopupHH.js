import React from 'react'
import Popup from '../shared/Popup'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as vacanciesActions from '../../redux/actions/vacancies'

class VacancyPopupHH extends React.Component {
    
    componentDidMount(){
        this.props.fetchVacancyHH(this.props.url)
    }

    render(){
        const {item, active, close} = this.props
        // console.log("HH popup", this.props)
        return (
            <Popup active={active} close={close}>
            <div className="columns">
                <div className="column is-6-desktop is-offset-1-desktop">
                    <div className="vac-title">
                        <h3>
                            {item.name}
                        </h3>
                    </div>
                    <hr />
                    <div className="description" dangerouslySetInnerHTML={this.createMarkup(item.description)}>
                    </div>
                </div>
                <div className="column is-3-desktop is-offset-1-desktop">
                    <hr className="salary"/>
                    <h6>
                        {item.salary && (item.salary.from !== null) && ("от " + item.salary.from + " руб.")}
                        {item.salary && (item.salary.to !== null) && ("до " + item.salary.to + " руб.")} 
                    </h6>
                    <hr />

                    <p><b>Опыт работы:</b></p>
                    <p>{item.experience && item.experience.name}</p>
                    <p style={{marginTop: "3rem"}}><b>Занятость:</b></p>
                    <p>{item.employment && item.employment.name}</p>

                    {/* {RichText.render(item.data.time, PrismicConfig.linkResolver)}   */}
                    <hr className="final"/>
                    <p>
                        Чтобы откликнуться на вакансию, присылайте резюме, а также портфолио или презентацию по выполненным работам на почту
                        <br />
                        <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a>
                    </p>
                </div>
            </div>
        </Popup>
        )
    }

    createMarkup = (markup) => {
        return {__html: markup}
    }

}

const mapStateToProps = state => {
    const { vacancies } = state
    return { vacancies }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        vacanciesActions, 
        ), dispatch);
}

  
export default connect(mapStateToProps, mapDispatchToProps)(VacancyPopupHH)
