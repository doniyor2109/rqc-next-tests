/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  height: 3.5rem;
  width: 3.5rem;
  padding: 0.9rem 0.8rem;
  position: absolute;
  right: 3rem;
  bottom: 2.5rem;
  overflow: hidden;
  border-style:solid;
  border-width: 2px;
  border-color: #${props => props.color};
  color: #${props => props.color};
  background: transparent;
  cursor: pointer;
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    padding: 0.6rem 0.9rem;
  }

  img {
    animation: appear_from_left 1s;
  }

  &:hover {
    img {
      animation: clickme 1s infinite;
    }
  }

  &:focus {
    outline: 0;
  }

@keyframes appear_from_left {
  0% {
    transform: translate(-5rem);
    opacity: 0;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

@keyframes clickme {
  0% {
    transform: translate(0);
    opacity: 1;
  }
  100% {
    transform: translate(5rem);
    opacity: 0.5;
  }
}
`;

const ArrowButton = ({
  text, color, onClick,
}) => (
  <Button color={color} text={text} onClick={onClick}>
    {text}
    <img src={`/static/arrow_${color}.svg`} alt="Стрелка для кнопки" />
  </Button>
);

ArrowButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

ArrowButton.defaultProps = {
  text: '',
  color: 'fff',
  onClick: () => {},
};

export default ArrowButton;
