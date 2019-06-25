import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Partner = ({ item }) => (
  <div className="column is-2-desktop is-4-tablet is-6-mobile">
    <div className="partner-wrapper">
      <div className="img_wrap">
        <img src={item.partners_logo.url} alt={item.partners_name[0].text} />
      </div>
      {RichText.render(item.partners_name, PrismicConfig.linkResolver)}
    </div>
  </div>
);

Partner.propTypes = {
  item: PropTypes.shape({
    partners_logo: PropTypes.shape({
      url: PropTypes.string,
    }),
    partners_name: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
  }),
};

Partner.defaultProps = {
  item: {},
};

export default Partner;
