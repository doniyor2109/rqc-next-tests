import React from 'react';
import PropTypes from 'prop-types';

const PrevArrow = ({ className, onClick }) => (
  <div className={className} onClick={onClick} role="button" tabIndex="-1">
    <img src="/static/sci_slider_arrow_left.svg" alt="Previous slide button" />
  </div>
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
