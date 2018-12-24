import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import searchComplex from './searchComplex'

const ResultPeople = (props, context) => {

    const {item, search_text} = props
    const result = searchComplex([],item.data, search_text)
    console.log("RES for ", item.uid, " and search_text " , search_text, " is – ", result)

        return (
                    <div className="result result-people">
                        <Link href='/people'>
                            <a> 
                                {context.t("Люди")}
                            </a>
                        </Link>
                        <p className="highlighted">
                            {(result.length > 0) && result[0].highlight.map((res, index) => 
                                                        <span key={index} className={index === 1 ? "bold" : "normal"}>
                                                            {index === 2 ? res.slice(-3,0) : res}
                                                        </span>
                                        )
                            }
                        </p>
                    </div>
    ) 
}

ResultPeople.contextTypes = {
    t: PropTypes.func
  }

export default ResultPeople