import React from 'react'
import Popup from '../shared/Popup'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import PropTypes from 'prop-types'

export const VacancyPopup = ({item, active, close}, context) => {

    if (item) { 
        return (
        <Popup active={active} close={close}>
            <div className="columns">
                <div className="column is-6-desktop is-offset-1-desktop">
                    <div className="vac-title">
                        {RichText.render(item.data.name, PrismicConfig.linkResolver)}
                    </div>
                    <hr />
                    <p><b>{context.t("Обязанности")}:</b></p>
                    {RichText.render(item.data.todo, PrismicConfig.linkResolver)}  
                    <p><b>{context.t("Требования")}:</b></p>
                    {RichText.render(item.data.requirements, PrismicConfig.linkResolver)}  
                    <p><b>{context.t("Условия")}:</b></p>
                    {RichText.render(item.data.conditions, PrismicConfig.linkResolver)}  
                    <p><b>{context.t("Приветствуется")}:</b></p>
                    {RichText.render(item.data.good_to_know, PrismicConfig.linkResolver)}  

              
                </div>
                <div className="column is-3-desktop is-offset-1-desktop">
                    <hr style={{marginTop: "10.5rem"}}/>
                    {RichText.render(item.data.salary, PrismicConfig.linkResolver)}
                    <hr />
                    <p><b>{context.t("Опыт работы")}:</b></p>
                    {RichText.render(item.data.experience, PrismicConfig.linkResolver)}  
                    <p style={{marginTop: "3rem"}}><b>{context.t("Занятость")}:</b></p>
                    {RichText.render(item.data.time, PrismicConfig.linkResolver)}  
                    <hr style={{marginTop: "3rem"}}/>
                    <p>
                        {context.t("Чтобы откликнуться на вакансию, присылайте резюме, а также портфолио или презентацию по выполненным работам на почту")}:
                        <br />
                        <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a>
                    </p>
                </div>
            </div>
        </Popup>
        )
    }
}


VacancyPopup.contextTypes = {
    t: PropTypes.func
  }

export default VacancyPopup