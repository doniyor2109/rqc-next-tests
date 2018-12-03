import React from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Partner = ({item}) => (
    <div className="column is-2-desktop is-6-mobile">
        <div className="img_wrap"> 
            <img src={item.partners_logo.url} alt={item.partners_name} />
        </div>
        {RichText.render(item.partners_name, PrismicConfig.linkResolver)} 
    </div>
)

export default Partner