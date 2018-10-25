import React from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const ArticleHero = ({backImage, tags, date, title}) => (

    <div className="article-hero">
        <div className="container">
            <div className="columns">
                <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
                    <div className="article-tags">
                        {tags.map((item, index) =>
                            <p key={index}>{item}</p>
                        )}
                    </div>
                    {RichText.render(title, PrismicConfig.linkResolver)}
                    <p className="article-date">
                        {date}
                    </p>
                    <img src={backImage} alt={title[0].text}/>
                </div>
            </div>
        </div>
    </div>
)
           
export default ArticleHero