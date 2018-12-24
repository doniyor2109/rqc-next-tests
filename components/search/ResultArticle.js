import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import searchComplex from './searchComplex'

const ResultArticle = (props, context) => {

    const {item, search_text} = props
    // var now = require("performance-now")
    // var start = now()
    const result = searchComplex([],item.data, search_text)
    // var end = now()
    // console.log("searchComplex took ", (start-end).toFixed(3)) // ~ 0.002 on my system
    // result = searchComplex(item.data, search_text)
    console.log("RES for ", item.uid, " and search_text " , search_text, " is – ", result, result.length > 0 )

    return (
        <div className="result result-article">
            <Link href={'/article?uid=' + item.uid} as={'/article/' + item.uid}>
                <a> 
                    {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                </a>
            </Link>
            <p className="highlighted">
                {(result.length > 0) && 
                    (result[0].key === "title"
                        ? result[1] && result[1].highlight.map((res, index) => 
                                                <span key={index} className={index === 1 ? "bold" : "normal"}>
                                                    {res}
                                                </span>
                                )
                        : result && result[0].highlight.map((res, index) => 
                            <span key={index} className={index === 1 ? "bold" : "normal"}>
                                {res}
                            </span>
                                )
                    )
                }
            </p>
        </div>
    ) 
}

ResultArticle.contextTypes = {
    t: PropTypes.func
  }

export default ResultArticle