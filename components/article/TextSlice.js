import React from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const TextSlice = ({slice}) => (
    <div className="slice-type-text columns">
        <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
            {RichText.render(slice.primary.news_body, PrismicConfig.linkResolver)}
        </div>
    </div>
    )
            
export default TextSlice