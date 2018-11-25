import React, {Fragment} from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import { ArrowButton } from '../shared/ArrowButton'
import Popup from '../shared/Popup'
import PropTypes from 'prop-types'

const PersonaPopup = ({active, close, item}, context) => {
    if (item) {
        return (
            <Popup close={close} active={active}>
                <div className="columns">
                    <div className="column is-4-desktop is-offset-1-desktop is-6-tablet">
                        <div className="portrait_wraper">
                            <img className="portrait" src={item.portrait.url} alt={item.people_name + "photo"} />
                        </div>
                    </div>
                    <div className="column is-4-desktop is-6-tablet">
                        <div className="name">
                            {RichText.render(item.people_name, PrismicConfig.linkResolver)}
                        </div>    
                        <div className="position">
                            {RichText.render(item.position, PrismicConfig.linkResolver)}
                        </div>   
                        {item.website && item.website.url && <ArrowButton text="Персональный сайт" color="3998D1" url={item.website.url} target_blank/>}
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-11-desktop is-offset-1-desktop">
                        <hr />
                    </div>
                </div>
                <div className="columns">
                    <div className={(item.awards[0] && (item.awards[0].text.length > 0))
                                    ? "column is-5-desktop is-offset-1-desktop"
                                    : "column is-10-desktop is-offset-1-desktop is-12-tablet"
                                    }>
                        <img src="/static/bio.svg" className="awards_img" alt=""/>
                        <h1>{context.t("Биография")}</h1>
                        <div className="titles">
                            {RichText.render(item.titles, PrismicConfig.linkResolver)}
                        </div>
                    </div>
                    <div className="column is-4-desktop is-offset-1-desktop">
                        {item.awards[0] && (item.awards[0].text.length > 0) 
                        && 
                        <Fragment>
                            <img src="/static/awards.svg" className="awards_img" alt=""/>
                            <h1>{context.t("Достижения")}</h1>
                            <div className="awards">
                                {RichText.render(item.awards, PrismicConfig.linkResolver)}
                            </div>
                        </Fragment>
                        } 
                    </div>
                </div>
            </Popup>
        )
    }
}

PersonaPopup.contextTypes = {
    t: PropTypes.func
  }

export default PersonaPopup