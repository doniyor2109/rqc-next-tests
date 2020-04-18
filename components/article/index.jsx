// core libs
import React from 'react'

// components
import ArticleBody from './ArticleBody'
import ArticleHero from './ArticleHero'
import MoreNews from './MoreNews'
import Socials from '../shared/Socials'

// helpers
import moment from 'moment'
import 'moment/locale/ru'
import hostName from '../../host'

const Article = ({
  article,
  phone,
  tablet,
  lang,
  uid,
  morenewsByTag,
  related,
}) => {
  const {
    item: { data, tags, id },
  } = article
  if (lang === 'ru') {
    moment.locale('ru')
  } else moment.locale('en')

  return (
    <>
      <ArticleHero
        cover={data.cover}
        tags={tags}
        date={moment(data.manual_date_of_publication).format('LL')}
        title={data.title}
        phone={phone}
        tablet={tablet}
      />

      <ArticleBody lead={data.title_description} slices={data.body} />

      <div className="container">
        <div className="columns">
          <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
            <Socials
              url={hostName + '/article/' + uid}
              quote={data.title[0] && data.title[0].text}
              image={data.cover.url}
            />
          </div>
        </div>
      </div>
      <MoreNews
        fetchNewsByTag={morenewsByTag}
        relatedTo={id}
        tags={tags}
        articles={related.articles}
        isFetching={related.isFetching}
        nextPage={related.nextPage}
        lang={lang}
        phone={phone}
        tablet={tablet}
      />
    </>
  )
}

export default Article
