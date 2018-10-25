import React  from 'react'
import {NavLink} from 'react-router-dom'

import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

import moment from 'moment'
import 'moment/locale/ru';

const VideoCard = ({ item }) => {

    if (item) return (
            <div className="column is-12-mobile is-12-tablet is-6-desktop">
                <div className="video-card">
                    <div className="video" dangerouslySetInnerHTML={{ __html: item.data.youtube_link.html }} />
                    <NavLink to={"/video/" + item.uid}>
                        {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                        <div className="date">
                            {moment(item.first_publication_date).format('LL')}
                        </div>
                    </NavLink>
                </div>
            </div>
        )
}

export default VideoCard