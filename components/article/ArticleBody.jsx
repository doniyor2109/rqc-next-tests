import React from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const ArticleBody = ({lead, content}) => (

    <div className="article-body">
        <div className="container">
            <div className="columns">
                <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
                    {RichText.render(lead, PrismicConfig.linkResolver)}
                </div>
            </div>
            {content}
            <div className="column hr is-8-desktop is-offset-2-desktop is-12-tablet">
                <hr />
            </div>
        </div>
  </div>
)
            
export default ArticleBody