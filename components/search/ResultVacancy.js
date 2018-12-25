import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import searchComplex from './searchComplex'

const ResultVacancy = (props, context) => {

    const {item, search_text} = props
    const result = searchComplex([],item.data, search_text)
    console.log("RES for ", item.uid, " and search_text " , search_text, " is – ", result)
    return (
        <div className="result result-vacancy">
            <Link href={'/about#vacancies'}>
                <a>                     
                    {RichText.render(item.data.name, PrismicConfig.linkResolver)}
                </a>
            </Link>
            <p className="highlighted">
            {(result.length > 0) && 
                (result[0].key === "name"
                    ?   item.data.todo[0].text.split(' ').slice(0, 20).join(' ')
                    :   result[0] && result[0].highlight.map((res, index) => 
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

ResultVacancy.contextTypes = {
    t: PropTypes.func
  }

export default ResultVacancy