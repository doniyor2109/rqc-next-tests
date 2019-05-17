import React from 'react';
import Link from 'next/link';
import Media from 'react-media';
import PropTypes from 'prop-types';

import NewscardSmall from '../news/NewscardSmall';
import NewsType from '../news/NewsType';

import MainCategory from '../shared/styled/MainCategory';
import MainCategoryLink from '../shared/styled/MainCategoryLink';

const NewsTeaser = ({ articles, phone, tablet }, { t }) => (
  <section className="news-teaser" style={{ padding: '9rem 0 0 0' }}>
    <div className="container">
      <Link href="/news">
        <MainCategory>
          {t('Новости')}
        </MainCategory>
      </Link>
      <Link href="/news">
        <MainCategoryLink>
          {t('смотреть все')}
        </MainCategoryLink>
      </Link>
      <div className="columns is-multiline" style={{ clear: 'both' }}>

        {/* в зависимости от размера окна браузера мы рендерим разные верстки секции с тизерами новостей */}
        {/* вариант смартфона и Ipad */}
        {articles
              && (
              <Media
                query="(max-width: 768px)"
                defaultMatches={tablet !== null}
                render={() => articles.slice(0, 2).map((item, index) => <NewscardSmall columns="6" article={item} key={index} />)}
              />
              )

              }
        {/* вариант десктопа */}
        {articles
              && (
              <Media
                query="(min-width: 769px)"
                defaultMatches={phone === null && tablet === null}
                render={() => articles.map((item, index) => <NewscardSmall columns="4" article={item} key={index} />)}
              />
              )
              }
      </div>
    </div>
  </section>
);

NewsTeaser.propTypes = NewsType;

NewsTeaser.contextTypes = {
  t: PropTypes.func,
};

export default NewsTeaser;
