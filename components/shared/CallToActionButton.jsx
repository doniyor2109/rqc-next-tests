import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
    border: 0;
    background: #3998D1;
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: white;
    text-transform: uppercase;
    font-size: 1.4rem;
    cursor: pointer;
`;
const CallToActionButton = ({ text, onClick }) => (
  <Button onClick={onClick}>
    {text}
  </Button>
);

CallToActionButton.propTypes = {
  text: PropTypes.string,
};

CallToActionButton.defaultProps = {
  text: '',
};

export default CallToActionButton;
