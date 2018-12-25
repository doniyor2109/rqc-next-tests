import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import searchComplex from './searchComplex'

const ResultEvent = (props, context) => {

    const {item, search_text} = props
    const result = searchComplex([],item.data, search_text)
    console.log("RES for ", item.uid, " and search_text " , search_text, " is – ", result)
    return (
        <div className="result result-event">
            <Link href={'/event?uid=' + item.uid} as={'/event/' + item.uid}>
                <a>                     
                    {RichText.render(item.data.additional, PrismicConfig.linkResolver)}
                    {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                </a>
            </Link>
            <p className="highlighted">
                {(result.length > 0) && result[0].highlight.map((res, index) => 
                                            <span key={index} className={index === 1 ? "bold" : "normal"}>
                                                {res}
                                            </span>
                            )
                }
            </p>
        </div>
    ) 
}

ResultEvent.contextTypes = {
    t: PropTypes.func
  }

export default ResultEvent