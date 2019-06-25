import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Arrow = styled.div`
  &:before {
    content: "";
  }
  right: 3rem;
`;


const NextArrow = ({ className, onClick }) => (
  <Arrow className={className} onClick={onClick} role="button" tabIndex="-1">
    <img src="/static/image_slider_arrow_right.svg" alt="Previous slide button" />
  </Arrow>
);

NextArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

NextArrow.defaultProps = {
  className: '',
  onClick: () => {},
};

export default NextArrow;
