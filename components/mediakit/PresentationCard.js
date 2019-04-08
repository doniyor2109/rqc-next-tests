import React  from 'react'

import { RichText, Link } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton'


const PresentationCard = ({ item }) => {

    if (item) return (
            <div className="column is-12-mobile is-6-tablet is-4-desktop">
                <a href={Link.url(item.data.presentation_link, PrismicConfig.linkResolver)}
                   target="_blank"
                   rel="noopener noreferrer">
                    <div className="presentation-card">
                        <div className="img-wrap">
                            <img className="presentation_thumbnail" src={item.data.thumbnail.url} alt={item.data.thumbnail.alt} />
                            <ArrowButton color="ffffff"/>
                        </div>
                        {RichText.render(item.data.author_name, PrismicConfig.linkResolver)}
                        {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                    </div>
                </a>
            </div>
        )
}

export default PresentationCard