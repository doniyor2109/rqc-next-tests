import React from 'react'
import { RichText, Link } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'


const Publication = ({pub}) => {

    console.log("pub", pub)

    if (pub) {

        return (
    
            <div className="publication">
                {pub.data.authors1.map((author, index) => <a key={index} className="author" href={"/search/" + author.text}>{author.text}</a>)}
                <div className="title">
                    {RichText.render(pub.data.title, PrismicConfig.linkResolver)}
                </div>
                <a className="journal" href={Link.url(pub.data.journal_url, PrismicConfig.linkResolver)}>
                    {RichText.render(pub.data.journal_name, PrismicConfig.linkResolver)}
                </a>
                <div className="journal_volume">
                    {pub.data.volume}
                </div>
                <div className="journal_number">
                    {pub.data.number}
                </div>
                <div className="journal_pages">
                    {pub.data.pages}
                </div>
                {pub.data.eprint 
                ? 
                <a className="arxiv" href={"https://arxiv.org/abs/" + pub.data.eprint[0].text}>
                    Arxiv: {pub.data.eprint[0].text}
                </a>
                : ""
                }
            </div>
        )
    }
}

export default Publication