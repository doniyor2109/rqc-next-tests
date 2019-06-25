import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 3rem;
  button {
    background: transparent;
    border: 0;
    &:focus {
      outline: 0;
    }
  }
`;

const ButtonMore = ({ onClick }) => (
  <Wrapper>
    <button onClick={onClick} type="button">
      <img
        src="/static/more.svg"
        alt=""
      />
    </button>
  </Wrapper>
);

ButtonMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonMore;
