import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ring from './ring2.svg';

const propTypes = {
  className: PropTypes.string.isRequired,
};

const Loading = ({ className }) => (

  <div className={className}>
    <div className="loading">
      <div className="loading__ring">
        <Ring />
      </div>
      <div className="loading__ring">
        <Ring />
      </div>
    </div>
  </div>
);

Loading.propTypes = propTypes;

const StyledLoading = styled(Loading)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    opacity: 0.5;
    z-index: 100;

    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }
    .loading {
      width: 10rem;
      height: 10rem;

      &__ring {
        position: absolute;

        &:first-child {
          transform: skew(30deg,20deg);
        }

        &:last-child {
          transform: skew(-30deg,-20deg) scale(-1, 1);

          svg {
            animation-delay: -0.5s;
          }
        }

        svg {
          animation: rotate 1s linear infinite;
        }
    }
}
`;

export default StyledLoading;
