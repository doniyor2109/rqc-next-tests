import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';
import { Card } from './styled';

const GalleryCard = ({ item }) => (
  <div className="column is-12-mobile is-6-tablet is-4-desktop">
    <Link href={`/photo?uid=${item.uid}`} as={`/photo/${item.uid}`}>
      <Card>
        <div className="img-wrap">
          <img
            className="photo"
            src={item.data.photo_set[0].photo.thumbnail.url}
            alt={item.data.photo_set[0].photo.alt}
          />
          <ArrowButton color="ffffff" />
        </div>
        {RichText.render(item.data.title, PrismicConfig.linkResolver)}
      </Card>
    </Link>
  </div>
);

GalleryCard.propTypes = {
  item: PropTypes.shape({
    uid: PropTypes.string,
    data: PropTypes.shape({
      photo_set: PropTypes.arrayOf(PropTypes.shape({
        photo: PropTypes.shape({
          thumbnail: PropTypes.shape({
            url: PropTypes.string,
          }),
          alt: PropTypes.string,
        }),
      })),
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  }),
};

GalleryCard.defaultProps = {
  item: {},
};

export default GalleryCard;
