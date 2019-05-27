import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Style = styled.div`
  margin-top: 9rem;

  
`;

const Institute = ({ heading, text }) => (
  <Style>
    <div className="columns is-multiline">
      <div className="column is-12">
        {RichText.render(heading, PrismicConfig.linkResolver)}
      </div>
      <div className="column is-9-desktop is-offset-1-desktop is-12-tablet is-12-mobile">
        {RichText.render(text, PrismicConfig.linkResolver)}
      </div>
    </div>
  </Style>
);

Institute.propTypes = {
  heading: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  text: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

Institute.defaultProps = {
  heading: [],
  text: [],
};


export default Institute;
