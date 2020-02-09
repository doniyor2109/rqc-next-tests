import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Styled = styled.button`
  background: transparent;
  border: none;
  width: 6rem;
  height: 5rem;
  position: absolute;
  margin-top: 2rem;
  right: 3rem;
  z-index: 9;
  cursor: pointer;
  padding: 2rem;
  @media (max-width: 415px) {
    right: 1rem;
  }
  z-index: 9;
  &:focus {
    outline: 0;
  }
  cursor: pointer;

  span {
    background: ${props => (props.withSlider ? 'white' : 'black')};
    height: 2px;
    display: block;
    transform-origin: center;
    transition-duration: 86ms;
    transition-property: background-color, opacity, transform;
    transition-timing-function: ease-out;
    width: 16px;
    position: absolute;
    border: ${props => props.isActive && '1px solid black'};
  }

  span:nth-child(1) {
    top: calc(50% - 6px);
    transform: ${props => props.isActive && 'translateY(5px) rotate(45deg)'};
  }

  span:nth-child(2) {
    top: calc(50% - 1px);
    opacity: ${props => props.isActive && '0'};
  }
  span:nth-child(3) {
    top: calc(50% + 4px);
    transform: ${props => props.isActive && 'translateY(-5px) rotate(-45deg)'};
  }
`

const BurgerButton = ({ onClick, withSlider, isActive }) => (
  <Styled
    withSlider={withSlider}
    onClick={onClick}
    type="button"
    isActive={isActive}
  >
    <span />
    <span />
    <span />
  </Styled>
)

BurgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  withSlider: PropTypes.bool,
  isActive: PropTypes.bool,
}

BurgerButton.defaultProps = {
  withSlider: false,
  isActive: false,
}

export default BurgerButton
