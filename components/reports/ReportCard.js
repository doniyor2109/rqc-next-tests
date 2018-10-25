import React from 'react'
import { RichText, Link } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import { ArrowButton } from '../shared/ArrowButton'

const ReportCard = ({item}) => {
    const back = {background: "url(" + item.wallpaper.url + ")", backgroundSize:"cover"}
    return (
        <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="report" style={back}>
                {RichText.render(item.heading, PrismicConfig.linkResolver)}
                    <ArrowButton url={Link.url(item.report_url, PrismicConfig.linkResolver)}
                                color="ffffff"
                                target_blank
                    />
            </div>
        </div>
    )
}

export default ReportCard