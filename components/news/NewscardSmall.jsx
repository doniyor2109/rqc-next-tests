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
`;

const Small = styled.div`
  h1.title {
    font-size: 2.2rem;
    line-height: 2.5rem;
    font-weight: bold;
    color: #040303;
    margin-bottom: 2rem;
  }
  .published-date {
    font-size: 1.4rem;
    color:#040303;
    font-weight: 500;
  } 
`;

const NewscardSmall = ({ article }) => {
  if (article.lang === 'ru') {
    moment.locale('ru');
  }

  // Cначала проверяется есть ли в ручную установленная дата публикации -
  // для того, чтобы старые новости со старого сайта отображались корректно
  // Если это поле null, то выводится дата публикации новости в Prismic

  const date = article.data.manual_date_of_publication
    ? moment(article.data.manual_date_of_publication).format('LL')
    : moment(article.first_publication_date).format('LL');

  return (
    <div className="column is-4-desktop is-6-tablet">
      <Small>
        <Link href={`/article?uid=${article.uid}`} as={`/article/${article.uid}`}>
          <a>
            <Cover background={article.data.cover.thumbnail4.url}>
              <Tags tags={article.tags} color="white" />
              <ArrowButton color="ffffff" />
            </Cover>
            <h1 className="title">
              {article.data.title[0].text}
            </h1>
          </a>
        </Link>
        <p className="published-date">
          {date}
        </p>
      </Small>
    </div>
  );
};

NewscardSmall.propTypes = {
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
};

NewscardSmall.defaultProps = {
  article: {},
};

export default NewscardSmall;
