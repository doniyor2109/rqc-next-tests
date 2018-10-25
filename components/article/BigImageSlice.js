import React from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const BigImageSlice = ({slice}) => (

    <div className="slice-type-image columns">
        <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
            <figure>
                <div className="article-image-wrapper">
                    <img src={slice.primary.body_image.url} alt={slice.primary.body_image_description[0].text}/>
                    <figcaption>
                        {RichText.render(slice.primary.body_image_description, PrismicConfig.linkResolver)}
                    </figcaption>
                </div>
            </figure>
        </div>
    </div>
)
            
export default BigImageSlice