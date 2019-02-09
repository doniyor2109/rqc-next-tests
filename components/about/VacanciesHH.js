import React, {Fragment} from 'react'
import Media from 'react-media'
import VacancyCardHH from './VacancyCardHH'
import VacancyPopupHH from './VacancyPopupHH'
import { Loading } from '../shared/loading';

const VacanciesHH = (props) => {

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
                    render={() =>  vacancies.itemsHH.slice(0, vacanciesNumberDesktop).map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <VacancyCardHH item={item} onClick={handleClick} cardNumber={index} />
                                                <VacancyPopupHH key={index} 
                                                                url={item.url} 
                                                                item={vacancies.vacanciesbyID.filter(el => el.id === item.id).reduce((acc, val) => acc = val, [])} 
                                                                active={popupKey === index} 
                                                                close={popupClose}/>
                                            </Fragment>
                                        )
                                    })
                            } 
            />

            <Media  query="(min-width: 416px) and (max-width: 768px)"
                    defaultMatches={tablet !== null}
                    render={() =>  vacancies.itemsHH.slice(0, vacanciesNumberTablet).map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <VacancyCardHH item={item} onClick={handleClick} cardNumber={index} />
                                                <VacancyPopupHH key={index} url={item.url} item={vacancies.vacanciesbyID.filter(el => el.id === item.id).reduce((acc, val) => acc = val, [])} active={popupKey === index} close={popupClose}/>
                                            </Fragment>
                                        )
                                    })
                            } 
            />
        
            <Media  query="(max-width: 415px)"
                    defaultMatches={phone !== null}
                    render={() =>  vacancies.itemsHH.slice(0, vacanciesNumberMobile).map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <VacancyCardHH item={item} onClick={handleClick} cardNumber={index} />
                                                <VacancyPopupHH key={index} url={item.url} item={vacancies.vacanciesbyID.filter(el => el.id === item.id).reduce((acc, val) => acc = val, [])} active={popupKey === index} close={popupClose}/>
                                            </Fragment>
                                        )
                                    })
                            } 
            />

            {vacancies.itemsHH && (vacancies.itemsHH.length > 6) && moreVacanciesButtonPresent &&
                <div className="button-wraper">
                    <img src="/static/more.svg" onClick={e => {moreVacancies(e)}} />
                </div>
            }
        </Fragment>
    )
}

export default VacanciesHH
