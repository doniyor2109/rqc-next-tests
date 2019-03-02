import React from 'react'
import { RichText, Link, Date } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import moment from 'moment'
import '../../scss/publication.scss'

const Publication = ({pub}) => {

    // console.log("pub", pub)

    if (pub) {

        return (
    
            <div className="publication">
                <p className="authors">
                    {pub.data.authors.map((author, index) => <span key={index} className="author">{author.text}</span>)}
                </p>
                <div className="title">
                    <a href={pub.data.eprint[0] 
                                ? "https://arxiv.org/pdf/" + pub.data.eprint[0].text
                                : pub.data.doi.url}
                       target="_blank" rel="noopener noreferer"
                    >
                        {RichText.render(pub.data.title, PrismicConfig.linkResolver)}
                    </a>
                </div>
                <hr />
                <div className="journal_details">
                    <a className="journal" href={Link.url(pub.data.journal_url, PrismicConfig.linkResolver)}>
                        {RichText.render(pub.data.journal_name, PrismicConfig.linkResolver)}
                    </a>
                    {pub.data.volume && 
                        <div className="journal_volume">
                            №&nbsp;{pub.data.volume}
                        </div>
                    }
                    <div className="journal_number">
                        {pub.data.number ? '(' + pub.data.number+ '),' : ', '} 
                    </div>
                    {pub.data.article_number &&
                        <div className="article_number">
                            article № {pub.data.article_number}
                        </div>
                    }
                    {pub.data.pages.length > 0 && 
                        <div className="journal_pages">
                             pp.: {RichText.render(pub.data.pages, PrismicConfig.linkResolver)}
                        </div>
                    }
                </div>
                {pub.data.eprint.length > 0
                ? 
                <a className="arxiv" href={"https://arxiv.org/pdf/" + pub.data.eprint[0].text} target="_blank" rel="noopener noreferer">
                    Arxiv: {pub.data.eprint[0].text}
                </a>
                : ""
                }
                {pub.data.date &&
                        <div className="date">
                           {moment(Date(pub.data.date)).format('DD') + " " + 
                            moment(Date(pub.data.date)).format('MMMM') + " " +
                            moment(Date(pub.data.date)).format('YYYY')}
                        </div>
                }
            </div>
        )
    }
}

export default Publication