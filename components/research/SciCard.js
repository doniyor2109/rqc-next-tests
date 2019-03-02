import React from 'react'
import { ArrowButton } from '../shared/ArrowButton.js'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const SciCard = ({group}) => {

    if (group) {
        const back = {background: "url(" + group.data.image_gallery[0].labimage.mobile.url + ")",backgroundSize:"cover"}
        return (
            <div className="column is-4-desktop is-6-tablet is-12-mobile">
                <Link href={'/team?uid=' + group.uid} as={'/team/' + group.uid}>
                    <a>
                        <div className="sci-card">
                            <div className="back_holder" style={back}>
                                <ArrowButton color="ffffff"/>
                            </div>
                            <div className="title">
                                {RichText.render(group.data.groupname, PrismicConfig.linkResolver)}
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        )
    }
}


export default SciCard








