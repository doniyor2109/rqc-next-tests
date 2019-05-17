import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Date } from 'prismic-reactjs';
import moment from 'moment';
import 'moment/locale/ru';
import Link from 'next/link';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';

export const CardSmall = ({ item, desktop, tablet }) => {
  if (item.lang === 'ru') {
    moment.locale('ru');
  } else moment.locale('en');

  const hasBack = typeof item.data.wallpaper.url !== 'undefined';

  let back;
  if (desktop) {
    back = hasBack ? { background: `url(${item.data.wallpaper.largecard.url})`, backgroundSize: 'cover' }
      : { background: item.data.color_cover };
  } else if (tablet) {
    back = hasBack ? { background: `url(${item.data.wallpaper.largecardIpad.url})`, backgroundSize: 'cover' }
      : { background: item.data.color_cover };
  } else {
    back = hasBack ? { background: `url(${item.data.wallpaper.allcardsMobile.url})`, backgroundSize: 'cover' }
      : { background: item.data.color_cover };
  }

  const tags = item.tags.map((item, index) => <p key={index}>{item}</p>);

  // если мероприятие идет несколько дней, то разбираем объект Date на части
  // и составляем сложную дату вида July 15-19, 2019
  const date_start_end = `${moment(Date(item.data.start_date_time)).format('MMMM')} ${
    moment(Date(item.data.start_date_time)).format('DD')}-${
    moment(Date(item.data.end_date)).format('DD')}, ${
    moment(Date(item.data.start_date_time)).format('YYYY')}`;
  const date = item.data.end_date ? date_start_end : moment(Date(item.data.start_date_time)).format('LL');
  const time = item.lang === 'ru'
    ? moment(Date(item.data.start_date_time)).format('HH:mm')
    : moment(Date(item.data.start_date_time)).format('HH:mm a');
  return (

    <div className="column is-4-desktop is-6-tablet">
      <Link href={`/event?uid=${item.uid}`} as={`/event/${item.uid}`}>
        <a>
          <div className="event-card small" style={back}>
            <div className="tags">
              {tags}
            </div>
            <div className="additional">
              {RichText.render(item.data.additional, PrismicConfig.linkResolver)}
            </div>
            {RichText.render(item.data.title, PrismicConfig.linkResolver)}
            <div className="description">
              {RichText.render(item.data.description, PrismicConfig.linkResolver)}
            </div>
            <ArrowButton color="ffffff" />
            <div className="event-date">
              {date}
              <br />
              {time}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

CardSmall.propTypes = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      description: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      additional: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      wallpaper: PropTypes.shape({
        url: PropTypes.string,
        largecard: PropTypes.shape({
          url: PropTypes.string,
        }),
        largecardIpad: PropTypes.shape({
          url: PropTypes.string,
        }),
        allcardsMobile: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
      start_date_time: PropTypes.string,
      end_date: PropTypes.string,
    }),
    uid: PropTypes.string,
  }),
};

CardSmall.defaultProps = {
  item: {}
}
