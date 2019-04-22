import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Description = styled.div`
    font-size: 1.6rem;
    line-height: 2.3rem;
    color:#040303;
    margin-top: 6rem;
    a {
      color: #3998D1;
      font-weight: bold;
    }
    p:not(:last-child) {
      margin-bottom: 2.3rem;
    }
`;

const PageDescription = ({ description }) => (
  <Description>
    {RichText.render(description, PrismicConfig.linkResolver)}
  </Description>
);

PageDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

PageDescription.contextTypes = {
  t: PropTypes.func,
};

export default PageDescription;
