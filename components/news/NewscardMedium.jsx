/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ru';

import ArrowButton from '../shared/ArrowButton';
import Tags from '../shared/Tags';

const Cover = styled.div`
    background: ${props => `url(${props.background})`};
    background-size: cover;
    height: 23rem;
    margin-bottom: 3rem;
    position: relative;
    padding: 2.5rem;
    height: 40rem;
    position: relative;
    padding: 3rem;
    display: flex;
    flex-direction: column;

    .title {
      font-size: ${props => (props.large ? '3.2rem' : '2.2rem')};
      font-weight: bold;
      color: white;
      line-height: ${props => (props.large ? '4rem' : '2.5rem')};
      display: flex;
      flex-grow: 1;
      align-items: flex-end;
    }

    .published-date {
      color:white;
      font-size: 1.4rem;
    }
`;

const NewscardMedium = ({ article, large }) => {
  if (article.lang === 'ru') {
    moment.locale('ru');
  }
  const columns = large
    ? 'column is-8-desktop is-12-tablet'
    : 'column is-4-desktop is-6-tablet';

  // Cначала проверяется есть ли в ручную установленная дата публикации -
  // для того, чтобы старые новости со старого сайта отображались корректно
  // Если это поле null, то выводится дата публикации новости в Prismic

  const date = article.data.manual_date_of_publication ? moment(article.data.manual_date_of_publication).format('LL') : moment(article.first_publication_date).format('LL');
  return (
    <div className={columns}>
      <Link href={`/article?uid=${article.uid}`} as={`/article/${article.uid}`}>
        <a>
          <Cover background={article.data.cover.thumbnail8.url} large={large}>
            <Tags tags={article.tags} color="white" />
            <h1 className="title">
              {article.data.title[0].text}
            </h1>
            <p className="published-date">
              {date}
            </p>
            <ArrowButton url={`/news/${article.uid}`} color="ffffff" />
          </Cover>
        </a>
      </Link>
    </div>
  );
};

NewscardMedium.propTypes = {
  article: PropTypes.shape({
    uid: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.shape({
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      manual_date_of_publication: PropTypes.string,
      first_publication_date: PropTypes.string,
      cover: PropTypes.shape({
        thumbnail4: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  }),
  large: PropTypes.bool,
};

NewscardMedium.defaultProps = {
  article: {},
  large: false,
};

export default NewscardMedium;
