import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const Styled = styled.a`
    color: #555555;
    display: block;
    font-size: 2rem;
    line-height: 1.5;
    padding: 0.375rem 1rem;
    position: relative;

    @media (max-width: 415px) {
        font-size: 1.4rem;
        line-height: 1.5;
    }
`;

const Content = styled.div`
  background-color: white;
  border-radius: 0;
  box-shadow: none;
  padding: 0.5rem 0 0.5rem 4rem;
  padding-top: 0.5rem;
  @media (max-width: 415px){
    padding: 1rem 0 2rem 3rem;
    padding-top: 0.5rem;
    margin-top: 1rem;
  }
`;

const MenuItem = ({ children, onClick }, { t }) => {
  const ditems = children.map(item => (
    <Link href={item.children_url} key={item.children_url}>
      <Styled onClick={onClick}>
        {t(item.children_name)}
      </Styled>
    </Link>
  ));
  return (
    <Content>
      {ditems}
    </Content>
  );
};

MenuItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    children_name: PropTypes.string,
    children_url: PropTypes.string,
  })).isRequired,
  onClick: PropTypes.func.isRequired,

};

MenuItem.contextTypes = {
  t: PropTypes.func,
};

export default MenuItem;
