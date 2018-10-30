import React  from 'react'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import {ArrowButton} from '../news/ArrowButton'

import moment from 'moment'
import 'moment/locale/ru';

const GalleryCard = ({ item, lang }) => {
    if (lang === "ru") {
        moment.locale('ru')
    } else moment.locale('en')

    if (item) return (
            <div className="column is-12-mobile is-6-tablet is-4-desktop">
                <Link href={'/photo?uid=' + item.uid} as={'/photo/' + item.uid}>
                    <div className="gallery-card">
                        <div className="img-wrap">
                            <img className="photo" 
                                src={item.data.photo_set[0].photo.thumbnail.url} 
                                alt={item.data.photo_set[0].photo.alt} />
                            <ArrowButton color="ffffff"/>
                        </div>
                        {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                        <div className="date">
                            {moment(item.first_publication_date).format('LL')}
                        </div>
                    </div>
                </Link>
            </div>
        )
}

export default GalleryCard