import React from 'react'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'


const Publication = ({pub}) => {

    console.log("pub", pub)

    if (pub) {

        return (
    
            <div className="publication">
                {pub.data.authors1.map((author, index) => <div key={index} className="author">{author.text}</div>)}
                <div className="title">
                    {RichText.render(pub.data.title, PrismicConfig.linkResolver)}
                </div>
                <div className="journal">
                    {RichText.render(pub.data.journal.data.name, PrismicConfig.linkResolver)}
                </div>
                <div className="journal_volume">
                    {pub.data.volume}
                </div>
                <div className="journal_number">
                    {pub.data.number}
                </div>
                <div className="journal_pages">
                    {pub.data.pages}
                </div>
            </div>
        )
    }
}

export default Publication