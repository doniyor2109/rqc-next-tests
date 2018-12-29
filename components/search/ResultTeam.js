import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import searchComplex from './searchComplex'

const ResultTeam = (props, context) => {

    const {item, search_text} = props
    // var now = require("performance-now")
    // var start = now()
    const result = searchComplex([],item.data, search_text)
    // var end = now()
    // console.log("searchComplex took ", (start-end).toFixed(3)) // ~ 0.002 on my system
    // result = searchComplex(item.data, search_text)



        return (
                    <div className="result result-team">
                        <Link href={'/team?uid=' + item.uid} as={'/team/' + item.uid}>
                            <a> 
                                {RichText.render(item.data.groupname, PrismicConfig.linkResolver)}
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

ResultTeam.contextTypes = {
    t: PropTypes.func
  }

export default ResultTeam