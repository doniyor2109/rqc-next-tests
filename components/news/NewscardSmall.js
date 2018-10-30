import React from 'react'
import { ArrowButton } from './ArrowButton.js'
import { Date } from 'prismic-reactjs';
import moment from 'moment'
import 'moment/locale/ru';
import Link from 'next/link'


moment.locale('ru');

export const NewscardSmall = (props) => {

  const { article } = props
  const back = {background: "url(" + article.data.cover.thumbnail4.url + ")",backgroundSize:"cover"}

  const tags = article.tags.map((item, index) =>
    <p key={index}>{item}</p>
  )
  // Cначала проверяется есть ли в ручную установленная дата публикации -
  // для того, чтобы старые новости со старого сайта отображались корректно
  // Если это поле null, то выводится дата публикации новости в Prismic

  const date = article.data.manual_date_of_publication ? moment(Date(article.data.manual_date_of_publication)).format('DD MMMM YYYY') : moment(Date(article.first_publication_date)).format('LL')

  return (

    <div className="column is-4-desktop is-6-tablet">
      <div className="news-card-small">

        <Link href={'/article?uid=' + article.uid} as={'/article/' + article.uid}>
          <div className="back_holder" style={back}>
            <div className="tags">
              {tags}
            </div>
            <ArrowButton color="ffffff"/>
          </div>
        </Link>

        <h1 className="title">
          {article.data.title[0].text}
        </h1>
        <p className="published-date">
          {date}
        </p>
      </div>
    </div>
  )
}
