import React from 'react'
import Popup from '../shared/Popup'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

export const VacancyPopup = ({item, active, close}) => {

    if (item) { 
        return (
        <Popup active={active} close={close}>
            <div className="columns">
                <div className="column is-6-desktop is-offset-1-desktop">
                    <div className="vac-title">
                        {RichText.render(item.data.name, PrismicConfig.linkResolver)}
                    </div>
                    <hr />
                    <p><b>Обязанности:</b></p>
                    {RichText.render(item.data.todo, PrismicConfig.linkResolver)}  
                    <p><b>Требования:</b></p>
                    {RichText.render(item.data.requirements, PrismicConfig.linkResolver)}  
                    <p><b>Условия:</b></p>
                    {RichText.render(item.data.conditions, PrismicConfig.linkResolver)}  
                    <p><b>Приветствуется:</b></p>
                    {RichText.render(item.data.good_to_know, PrismicConfig.linkResolver)}  

              
                </div>
                <div className="column is-3-desktop is-offset-1-desktop">
                    <hr style={{marginTop: "10.5rem"}}/>
                    {RichText.render(item.data.salary, PrismicConfig.linkResolver)}
                    <hr />
                    <p><b>Опыт работы:</b></p>
                    {RichText.render(item.data.experience, PrismicConfig.linkResolver)}  
                    <p style={{marginTop: "3rem"}}><b>Занятость:</b></p>
                    {RichText.render(item.data.time, PrismicConfig.linkResolver)}  
                    <hr style={{marginTop: "3rem"}}/>
                    <p>
                        Чтобы откликнуться на&nbsp;вакансию, 
                        присылайте резюме, а&nbsp;также портфолио или презентацию 
                        по&nbsp;выполненным работам на&nbsp;почту:
                        <br />
                        <a href="mailto:job@rqc.ru" className="job-link">job@rqc.ru</a>
                    </p>

                </div>

            </div>
        </Popup>
        )
    }
}

export default VacancyPopup