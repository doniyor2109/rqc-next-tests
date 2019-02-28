import React from 'react' 
import PropTypes from 'prop-types'
import { RichText, Link, Date } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import moment from 'moment'

const simpleSearch = (data, search_text) => {

    // функция четкого поиска по заданной строке
    // ищет точные совпадения c помощью indexOf()

    // инициализируем переменные, в котороые будем складывать результаты
    var text_before_search = ""
    var text_after_search = ""
    var pos = null
    var str = ""

    pos = data.text.toLowerCase().indexOf(search_text.toLowerCase())

    if (pos !== -1) {
        str = data.text.slice(pos, pos + search_text.length)
        text_before_search = data.text.slice((pos - 100) < 0 ? 0 : (data.text.indexOf(" ", pos - 100)) + 1, pos)
        text_after_search = data.text.slice(pos + search_text.length)

        return [((pos - 100) < 0) ? text_before_search : ("..." + text_before_search) , str, (text_after_search)]
    } 
    else return false

}

const ResultPublication = (props, context) => {

    const {item, search_text} = props
    const resultInTitle = simpleSearch(item.data.title[0], search_text)
    const resultInJournal = simpleSearch(item.data.journal_name[0], search_text)
        return (
                    <div className="result result-publication">
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
                        {/* <p className="highlighted">
                            {(result.length > 0) && result[0].highlight.map((res, index) => 
                                                        <span key={index} className={index === 1 ? "bold" : "normal"}>
                                                            {res}
                                                        </span>
                                        )
                            }
                        </p> */}
                        <div className="journal_details">
                            <a className="journal" href={Link.url(item.data.journal_url, PrismicConfig.linkResolver)}>
                                <p>
                                {resultInJournal 
                                    ? resultInJournal.map((res, index) => 
                                            <span key={index} className={index === 1 ? "bold" : "normal"}>
                                                {res}
                                            </span>    )                            
                                    :  RichText.render(item.data.journal_name, PrismicConfig.linkResolver)
                                }
                                </p>
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