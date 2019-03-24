import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Tag = styled.button`
  font-size: 1.2rem;
  padding: 0.4rem 1rem;
  font-weight: 500;
  display: inline;
  margin-right: 3rem;
  text-transform: uppercase;
  color:${props => (props.active ? 'white' : '#040303')};
  background-color: ${props => (props.active ? '#3998D1' : 'white')};
  font-family: "DIN Pro", serif;
  border-color: ${props => (props.active ? '#3998D1' : 'rgba(4,3,3,0.5)')};
  border-width: 1px;
  cursor: pointer;

  @media screen and (max-width: 415px) {
    margin-bottom: 2.3rem;
    margin-right: 3rem;
    min-width: 10rem;
    :nth-child(2){
      margin-right: 0;
    }
  }

  &:focus {
    outline: 0;
  }
  @media screen and (max-width: 415px) {
    margin-right: 3rem;
  }
`;

const FilterTag = ({ active, children, onClick }) => (
  <Tag active={active} onClick={onClick}>
    {children}
  </Tag>
);

FilterTag.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default FilterTag;
