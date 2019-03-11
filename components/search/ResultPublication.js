import React from 'react' 
import PropTypes from 'prop-types'
import { RichText, Link, Date } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import moment from 'moment'
import {simpleSearch} from './searchComplex'

const ResultPublication = (props, context) => {

    const {item, search_text} = props
    const resultInTitle = simpleSearch(item.data.title[0], search_text)
    const resultInJournal = simpleSearch(item.data.journal_name[0], search_text)

    return (
                    <div className="result result-publication">
                        <p className="authors">
                            {item.data.authors.map((author, index) => <span key={index} className="author">{author.text}</span>)}
                        </p>
                        <a href={item.data.eprint[0] 
                                ? "https://arxiv.org/pdf/" + item.data.eprint[0].text
                                : item.data.doi.url}
                            target="_blank" 
                            rel="noopener noreferer"
                            className="title-link"
                        >
                            <h1>
                            {resultInTitle 
                                ? resultInTitle.map((res, index) => 
                                        <span key={index} className={index === 1 ? "bold" : "normal"}>
                                            {res}
                                        </span>    )                            
                                :  RichText.render(item.data.title, PrismicConfig.linkResolver)
                            }
                            </h1>
                        </a>
                        <div className="journal_details">
                            <a className="journal" href={Link.url(item.data.journal_url, PrismicConfig.linkResolver)}>
                                <div>
                                {resultInJournal 
                                    ? resultInJournal.map((res, index) => 
                                            <span key={index} className={index === 1 ? "bold" : "normal"}>
                                                {res}
                                            </span>    )                            
                                    :  RichText.render(item.data.journal_name, PrismicConfig.linkResolver)
                                }
                                </div>
                            </a>
                            {item.data.volume && 
                                <div className="journal_volume">
                                    №&nbsp;{item.data.volume}
                                </div>
                            }
                            <div className="journal_number">
                                {item.data.number ? '(' + item.data.number+ '),' : ', '} 
                            </div>
                            {item.data.article_number &&
                                <div className="article_number">
                                    article № {item.data.article_number}
                                </div>
                            }
                            {item.data.pages.length > 0 && 
                                <div className="journal_pages">
                                    pp.: {RichText.render(item.data.pages, PrismicConfig.linkResolver)}
                                </div>
                            }
                        </div>
                        {item.data.eprint.length > 0
                        ? 
                        <a className="arxiv" href={"https://arxiv.org/pdf/" + item.data.eprint[0].text} target="_blank" rel="noopener noreferer">
                            Arxiv: {item.data.eprint[0].text}
                        </a>
                        : ""
                        }
                        {item.data.date &&
                                <div className="date">
                                {moment(Date(item.data.date)).format('DD') + " " + 
                                    moment(Date(item.data.date)).format('MMMM') + " " +
                                    moment(Date(item.data.date)).format('YYYY')}
                                </div>
                        }
                    </div>
    ) 
}

ResultPublication.contextTypes = {
    t: PropTypes.func
  }

export default ResultPublication