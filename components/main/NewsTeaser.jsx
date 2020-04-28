import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import NewscardSmall from '../news/NewscardSmall'
import NewsType from '../news/NewsType'

import MainCategory from '../shared/styled/MainCategory'
import MainCategoryLink from '../shared/styled/MainCategoryLink'

const NewsTeaser = ({ articles }, { t }) => (
  <section className="news-teaser" style={{ padding: '9rem 0 0 0' }}>
    <div className="container">
      <MainCategory>{t('Новости')}</MainCategory>
      <Link href="/news">
        <MainCategoryLink>{t('смотреть все')}</MainCategoryLink>
      </Link>
      <div className="columns is-multiline" style={{ clear: 'both' }}>
        {articles.map(item => (
          <NewscardSmall columns="4" article={item} key={item.id} />
        ))}
      </div>
    </div>
  </section>
)

NewsTeaser.propTypes = NewsType

NewsTeaser.contextTypes = {
  t: PropTypes.func,
}

export default NewsTeaser
