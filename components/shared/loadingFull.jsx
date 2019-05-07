import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from './loading';


const LoadingFull = ({ isOff, className }) => (
  <div className={className}>
    <div className={isOff ? 'transparent-wall inactive' : 'transparent-wall'}>
      <Loading />
    </div>
  </div>
);

LoadingFull.propTypes = {
  className: PropTypes.string.isRequired,
  isOff: PropTypes.bool.isRequired,
};

const StyledLoading = styled(LoadingFull)`
    .transparent-wall{
      height: 104vh;
      position: fixed;
      width: 100%;
      background: rgba(255, 255, 255, 0.9);
      z-index: 99;
      display: block;
      &.inactive {
        display: none;
      }
    }
    .transparent-wall > div {
      height: 100%;
    }
  `;

export default StyledLoading;
