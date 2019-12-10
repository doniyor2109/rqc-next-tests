import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Link } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';
import { Card } from './styled';

const PresentationCard = ({ item }) => (
  <div className="column is-12-mobile is-6-tablet is-4-desktop">
    <a
      href={Link.url(item.data.presentation_link, PrismicConfig.linkResolver)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card>
        <div className="img-wrap">
          <img className="presentation_thumbnail" src={item.data.thumbnail.url} alt={item.data.thumbnail.alt} />
          <ArrowButton color="ffffff" />
        </div>
        {RichText.render(item.data.author_name, PrismicConfig.linkResolver)}
        {RichText.render(item.data.title, PrismicConfig.linkResolver)}
      </Card>
    </a>
  </div>
);

PresentationCard.propTypes = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      presentation_link: PropTypes.string,
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      author_name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      thumbnail: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
    }),
  }),
};

PresentationCard.defaultProps = {
  item: {},
};

export default PresentationCard;
