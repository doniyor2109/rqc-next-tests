import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const H1 = styled.h1`
    font-size: 4.2rem;
    @media (max-width: 415px) {
        font-size: 3.2rem
    }
    font-weight: bold;
    color:#040303;
    text-transform: uppercase;
`;

const PageHeading = ({ title }, { t }) => (
  <H1>
    {t(title)}
  </H1>
);

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

PageHeading.contextTypes = {
  t: PropTypes.func,
};

export default PageHeading;
