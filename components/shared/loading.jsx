import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string.isRequired,
};

const Loading = ({ className }) => (

  <div className={className}>
    <img src="/static/RQCloader2.gif" alt="loading animaton" />
  </div>
);

Loading.propTypes = propTypes;

const StyledLoading = styled(Loading)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    z-index: 100;

    img {
      width: 10rem;
    }
}
`;

export default StyledLoading;
