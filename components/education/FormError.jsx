import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = styled.p`
    color: #585AA8;
    font-size: 1.4rem;
    font-style: italic;
`;

const FormError = ({ text }) => (
  <Error>
    {text}
  </Error>
);

FormError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FormError;
