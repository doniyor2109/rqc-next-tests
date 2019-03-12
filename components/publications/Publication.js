import React from 'react' 
import PropTypes from 'prop-types'
import {Link, Date } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import styled from 'styled-components'
import moment from 'moment'

// STYLES

const Result = styled.div`
    margin-bottom: ${props => props.search ? 4 : 3}rem;
`

const Title = styled.a`
    font-size: ${props => props.big ? 2.2 : 1.6}rem;
    line-height: 3rem;
    color: #3998D1;
    margin-top:0.5rem;
    text-decoration: ${props => props.big ? "none" : "underline"};
    :hover {
        text-decoration: underline;
        color: #3998D1;
    }
    h1 {
        font-weight: 500;
        .bold {
            font-weight: 900;
        }
    }
`

const Authors = styled.p`
`

const Author = styled.span`
    font-weight: bold;
    margin-right: 0.5rem;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: rgba(4,3,3,0.7);
    :not(:last-child)::after {
        content: ","
    }
`
const Journal = styled.div`
    font-size: 1.4rem;
    line-height: 2.3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const JournalName = styled.a`
    margin-right: 0.5rem;
    color: #3998D1;
    p, span {
        font-size: 1.4rem;
        line-height: 2.3rem;
    }
    .bold {
        font-weight: 700;
    }
    :hover {
        text-decoration: underline;
        color: #3998D1;
    }
`

const Volume = styled.div``

const Number = styled.div`
    margin-right: 0.5rem;
`

const Article = styled.div`
    margin-right: 0.5rem;
`

const Pages = styled.div`
`

const Arxiv = styled.a`
    color: #3998D1;
    font-size: 1.4rem;
    line-height: 2.3rem;
    :hover {
        text-decoration: underline;
    }
`

const PubDate = styled.div`
    font-size: 1.4rem;
    line-height: 2.3rem;

`

const HR = styled.hr`
    width:16rem;
    height: 1px;
    margin: 1rem auto 1rem 0;
    background: rgba(4,3,3,0.5);
`

// HELPER

const simpleSearch = (data, search_text) => {

    // функция четкого поиска по заданной строке
    // ищет точные совпадения c помощью indexOf()

    const pos = data.text.toLowerCase().indexOf(search_text.toLowerCase())

    if (pos !== -1) {
        const str = data.text.slice(pos, pos + search_text.length)
        const text_before_search = data.text.slice((pos - 100) < 0 ? 0 : (data.text.indexOf(" ", pos - 100)) + 1, pos)
        const text_after_search = data.text.slice(pos + search_text.length, data.text.lastIndexOf(' ', pos + 100))

        return [text_before_search, str, text_after_search]
    } 
    else return false
}

const Publication = (props, context) => {

    const {item, search_text, search_page} = props
    const resultInTitle = search_text && simpleSearch(item.data.title[0], search_text)
    const resultInJournal = search_text && simpleSearch(item.data.journal_name[0], search_text)

    return (
                    <Result search={!search_text}>
                        <Authors>
                            {item.data.authors.map((author, index) => <Author key={index}>{author.text}</Author>)}
                        </Authors>
                        <Title  href={item.data.eprint[0] 
                                        ? "https://arxiv.org/pdf/" + item.data.eprint[0].text
                                        : item.data.doi.url}
                                target="_blank" 
                                rel="noopener noreferer"
                                className="title-link"
                                highlighted={resultInTitle ? true : false}
                                search={!search_text}
                                big={!search_page}
                        >
                            <h1>
                            {resultInTitle 
                                ? resultInTitle.map((res, index) => 
                                        <span key={index} className={index === 1 ? "bold" : undefined}>
                                            {res}
                                        </span>    )                            
                                :  item.data.title[0].text
                            }
                            </h1>
                        </Title>
                        {!search_page && 
                            <HR />
                        }
                        <Journal>
                            <JournalName href={Link.url(item.data.journal_url, PrismicConfig.linkResolver)}>
                                {resultInJournal 
                                    ? resultInJournal.map((res, index) => 
                                            <span key={index} className={index === 1 ? "bold" : undefined}>
                                                {res}
                                            </span>    )                            
                                    :  item.data.journal_name[0].text
                                }
                            </JournalName>
                            {item.data.volume && 
                                <Volume>
                                    №&nbsp;{item.data.volume}
                                </Volume>
                            }
                            <Number>
                                {item.data.number ? '(' + item.data.number + '),' : ', '} 
                            </Number>
                            {item.data.article_number &&
                                <Article>
                                    article № {item.data.article_number}
                                </Article>
                            }
                            {item.data.pages.length > 0 && 
                                <Pages>
                                    pp.: {item.data.pages[0].text}
                                </Pages>
                            }
                        </Journal>
                        {item.data.eprint.length > 0 
                        && 
                        <Arxiv href={"https://arxiv.org/pdf/" + item.data.eprint[0].text} target="_blank" rel="noopener noreferer">
                            Arxiv: {item.data.eprint[0].text}
                        </Arxiv>
                        
                        }
                        {item.data.date &&
                                <PubDate>
                                    {   moment(Date(item.data.date)).format('DD') + " " + 
                                        moment(Date(item.data.date)).format('MMMM') + " " +
                                        moment(Date(item.data.date)).format('YYYY')}
                                </PubDate>
                        }
                    </Result>
    ) 
}

Publication.contextTypes = {
    t: PropTypes.func
  }

export default Publication