import React, {Fragment} from 'react'
import Media from 'react-media'
import VacancyCard from './VacancyCard'
import VacancyPopup from './VacancyPopup'

const VacanciesPrismic = (props, context) => {

    const {phone, 
           tablet, 
           vacanciesNumberDesktop, 
           vacanciesNumberTablet, 
           vacanciesNumberMobile, 
           handleClick, 
           popupKey,
           popupClose,
           moreVacanciesButtonPresent,
           moreVacancies,
           vacancies, 
           isFetching
         } = props

    return (       
             
        <Fragment>
            <Media  query="(min-width: 769px)"
                    defaultMatches={phone === null && tablet === null}
                    render={() =>  vacancies.items.slice(0, vacanciesNumberDesktop).map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <VacancyCard item={item} onClick={handleClick} cardNumber={index} />
                                                <VacancyPopup key={index} item={item} active={popupKey === index} close={popupClose}/>
                                            </Fragment>
                                        )
                                    })
                            } 
            />

            <Media  query="(min-width: 416px) and (max-width: 768px)"
                    defaultMatches={tablet !== null}
                    render={() =>  vacancies.items.slice(0, vacanciesNumberTablet).map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <VacancyCard item={item} onClick={handleClick} cardNumber={index} />
                                                <VacancyPopup key={index} item={item} active={popupKey === index} close={popupClose}/>
                                            </Fragment>
                                        )
                                    })
                            } 
            />
        
            <Media  query="(max-width: 415px)"
                    defaultMatches={phone !== null}
                    render={() =>  vacancies.items.slice(0, vacanciesNumberMobile).map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <VacancyCard item={item} onClick={handleClick} cardNumber={index} />
                                                <VacancyPopup key={index} item={item} active={popupKey === index} close={popupClose}/>
                                            </Fragment>
                                        )
                                    })
                            } 
            />

            {(vacancies.items.length > 6) && moreVacanciesButtonPresent &&
                <div className="button-wraper">
                    <img src="/static/more.svg" onClick={e => {moreVacancies(e)}} />
                </div>
            }
        </Fragment>
    )

}

export default VacanciesPrismic
