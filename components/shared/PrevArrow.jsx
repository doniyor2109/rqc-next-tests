import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Arrow = styled.div`
  &:before {
    content: "";
  }
`;

const PrevArrow = ({ className, onClick }) => (
  <Arrow className={className} onClick={onClick} role="button" tabIndex="-1">
    <img src="/static/sci_slider_arrow_left.svg" alt="Previous slide button" />
  </Arrow>
);

PrevArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

PrevArrow.defaultProps = {
  className: '',
  onClick: () => {},
};

export default PrevArrow;
