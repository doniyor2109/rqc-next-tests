import React from 'react';
import PropTypes from 'prop-types';

const NextArrow = ({ className, onClick }) => (
  <div className={className} onClick={onClick} role="button" tabIndex="-1">
    <img src="/static/sci_slider_arrow_right.svg" alt="Previous slide button" />
  </div>
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
