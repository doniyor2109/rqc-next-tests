import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import searchComplex from './searchComplex'

const ResultPhoto = (props, context) => {

    const {item, search_text} = props
    // var now = require("performance-now")
    // var start = now()
    const result = searchComplex([],item.data, search_text)
    // var end = now()
    // console.log("searchComplex took ", (start-end).toFixed(3)) // ~ 0.002 on my system
    // result = searchComplex(item.data, search_text)
    console.log("RES for ", item.uid, " and search_text " , search_text, " is – ", result)



        return (
                    <div className="result result-photo">
                        <Link href={'/photo?uid=' + item.uid} as={'/photo/' + item.uid}>
                            <a> 
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

ResultPhoto.contextTypes = {
    t: PropTypes.func
  }

export default ResultPhoto