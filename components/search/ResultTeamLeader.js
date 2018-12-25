import React from 'react' 
import Link from 'next/link'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import searchComplex from './searchComplex'

const ResultTeamLeader = (props, context) => {

    const {item, search_text} = props
    const result = searchComplex([],item.data, search_text)
    console.log("RES for ", item.uid, " and search_text " , search_text, " is – ", result)
    return (
        <div className="result result-team-leader">
            <Link href={'/team?uid=' + item.data.science_group.uid} as={'/team/' + item.data.science_group.uid}>
                <a> 
                    {RichText.render(item.data.science_group.data.groupname, PrismicConfig.linkResolver)}
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

ResultTeamLeader.contextTypes = {
    t: PropTypes.func
  }

export default ResultTeamLeader