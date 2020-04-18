// core libs
import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'

// components
import ArticleBody from './ArticleBody'
import ArticleHero from './ArticleHero'
import BigImageSlice from './BigImageSlice'
import QuoteSlice from './QuoteSlice'
import TextSlice from './TextSlice'
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
  // готовим разные элементы DOM в зависимости от разных slices полученных от Prismic
  var articleContent = []
  if (data) {
    // Определяем верстку для каждого типа slice
    articleContent = data.body.map((slice, index) => {
      // верстка для текста
      if (slice.slice_type === 'text') {
        return <TextSlice slice={slice} key={slice.slice_type + index} />
      }

      // верстка для цитат
      if (slice.slice_type === 'author-quote') {
        return <QuoteSlice slice={slice} key={slice.slice_type + index} />
      }

      // верстка для больших картинок
      if (slice.slice_type === 'image-description') {
        return <BigImageSlice slice={slice} key={slice.slice_type + index} />
      }

      return ''
    })
  }

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

      <ArticleBody lead={data.title_description} content={articleContent} />

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

Article.propTypes = {}

export default Article
