/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Card = styled.div`
  color: #040303;

  a {
    color: #040303;
  }

  .video {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 0 !important;
      pointer-events: auto;
    }
  }
  h1 {
    font-size: 2.2rem;
    line-height: 2.5rem;
    font-weight: bold;
    margin-top: 3rem;
  }
  .date {
    font-size: 1.4rem;
    margin-top: 1.3rem;
  }
`;

const VideoCard = ({ item }) => (
  <div className="column is-12-mobile is-12-tablet is-6-desktop">
    <Card>
      <div
        className="video"
        dangerouslySetInnerHTML={{ __html: item.data.youtube_link.html }}
      />
      <Link href={`/video?uid=${item.uid}`} as={`/video/${item.uid}`}>
        <a>
          {RichText.render(item.data.title, PrismicConfig.linkResolver)}
        </a>
      </Link>
    </Card>
  </div>
);

VideoCard.propTypes = {
  item: PropTypes.shape({
    uid: PropTypes.string,
    data: PropTypes.shape({
      youtube_link: PropTypes.shape({
        html: PropTypes.string,
      }),
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  }),
};

VideoCard.defaultProps = {
  item: {},
};

export default VideoCard;
