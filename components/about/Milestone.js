import React from 'react'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'

const Milestone = ({milestone}) => (

    <div className="mlstone">
        <img src="/static/about_milestone_dot.svg" alt="" />
        <div className="year_wrapper">
            <b>{milestone.year}</b>
            {RichText.render(milestone.milestone, PrismicConfig.linkResolver)}
        </div>
    </div>

)
export default Milestone