import React from 'react';
import Link from 'next/link';
import Media from 'react-media';
import PropTypes from 'prop-types';

import NewscardSmall from '../news/NewscardSmall';
import NewsType from '../news/NewsType';

const NewsTeaser = ({ articles, phone, tablet }, { t }) => (
  <section className="news-teaser">
    <div className="container">
      <Link href="/news">
        <a className="main-category">
          {t('Новости')}
        </a>
      </Link>
      <Link href="/news">
        <a className="main-category-link">
          {t('смотреть все')}
        </a>
      </Link>
      <div className="columns is-multiline">

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
