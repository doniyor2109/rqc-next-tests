import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.button`
  background: transparent;
  border: none;
  margin-top: 4rem;
  margin-right: 1.5rem;
  height: 1rem;
  cursor: pointer;
  order: 2;
  &:focus {
    outline: 0;
  }
`;

const SearchIcon = ({ onClick, withSlider }) => (
  <Styled onClick={onClick} type="button" className="search_icon">
    <img src={withSlider ? '/static/search_white.svg' : '/static/search_gray.svg'} alt="Поиск по сайту" />
  </Styled>
);

SearchIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  withSlider: PropTypes.bool,
};

SearchIcon.defaultProps = {
  withSlider: false,
};

export default SearchIcon;
