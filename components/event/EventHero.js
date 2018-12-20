import React from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const EventHero = ({backImage, tags, date, title, additional, description}) => {


    const hasBack = backImage.length > 0

    return (
        <div className={hasBack ? "event-hero hasBack" : "event-hero"} style={{background:'url(' + backImage + ')'}}>
            <div className="container">
                <div className="columns">
                    <div className="column is-9-desktop is-12-tablet is-12-mobile">
                        <div className={hasBack ? "event-tags white" : "event-tags"}>
                            {tags.map((item, index) =>
                                <p key={index}>{item}</p>
                            )}
                        </div>
                        <div className={hasBack ? "additional white" : "additional"}>
                            {RichText.render(additional, PrismicConfig.linkResolver)}
                        </div>
                        <div className={hasBack ? "title white" : "title"}>
                            {RichText.render(title, PrismicConfig.linkResolver)}
                        </div>
                        {hasBack && 
                            <div className={hasBack ? "description white" : "description"}>
                                {RichText.render(description, PrismicConfig.linkResolver)}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}
           
export default EventHero