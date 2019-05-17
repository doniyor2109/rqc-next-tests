import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Media from 'react-media';

import { CardLarge } from '../events/CardLarge';
import { CardSmall } from '../events/CardSmall';

import MainCategory from '../shared/styled/MainCategory';
import MainCategoryLink from '../shared/styled/MainCategoryLink';

const EventTeaser = ({ events, phone, tablet }, { t }) => (
  <section className="event-teaser" style={{ marginBottom: '9rem' }}>
    <div className="container">
      <Link href="/events">
        <MainCategory>
          {t('Мероприятия')}
        </MainCategory>
      </Link>
      <Link href="/events">
        <MainCategoryLink>
          {t('смотреть все')}
        </MainCategoryLink>
      </Link>
      <div className="columns is-multiline">
        {/* в зависимости от размера окна браузера рендерим
        разные верстки секции с тизерами мероприятий */}

        {/* вариант смартфона и планшета */}
        <Media
          query="(max-width: 768px)"
          defaultMatches={tablet !== null}
          render={() => events.map(item => <CardSmall item={item} key={item.data.title[0].text} />)}
        />

        {/* вариант десктопа */}
        <Media
          query="(min-width: 769px)"
          defaultMatches={phone === null && tablet === null}
          render={() => events.map((item, index) => {
            if (index === 0) {
              return <CardLarge item={item} key={item.data.title[0].text} desktop />;
            } return <CardSmall item={item} key={item.data.title[0].text} desktop />;
          })}
        />
      </div>
    </div>
  </section>
);

EventTeaser.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  })),
  phone: PropTypes.string,
  tablet: PropTypes.string,
};

EventTeaser.defaultProps = {
  events: [],
  phone: null,
  tablet: null,
};

EventTeaser.contextTypes = {
  t: PropTypes.func,
};

export default EventTeaser;
