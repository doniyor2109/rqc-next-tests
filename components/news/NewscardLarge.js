import React from 'react'
import { ArrowButton } from './ArrowButton.js'
import { Date } from 'prismic-reactjs'
import moment from 'moment'
import 'moment/locale/ru'
import Link from 'next/link'

moment.locale('ru')

export const NewscardLarge = (props) => {

  const { article } = props
  const back = {background: "url(" + article.data.cover.thumbnail8.url + ")",backgroundSize:"cover"}

  const tags = article.tags.map((item, index) =>
    <p key={index}>{item}</p>
  )
  // Cначала проверяется есть ли в ручную установленная дата публикации -
  // для того, чтобы старые новости со старого сайта отображались корректно
  // Если это поле null, то выводится дата публикации новости в Prismic

  const date = article.data.manual_date_of_publication ? moment(Date(article.data.manual_date_of_publication)).format('LL') : moment(Date(article.first_publication_date)).format('LL')
  return (
    <div className="column is-8-desktop is-12-tablet">
      <Link href={{pathname: '/article/', query: {uid: article.uid}}} as={'/article/' + article.uid}>
        <div className="news-card-large" style={back}>
          <div className="tags">
            {tags}
          </div>
          <h1 className="title">
            {article.data.title[0].text}
          </h1>
          <p className="published-date">
            {date}
          </p>
          <ArrowButton color="ffffff"/> 
        </div>
      </Link>
    </div>
  )
}
