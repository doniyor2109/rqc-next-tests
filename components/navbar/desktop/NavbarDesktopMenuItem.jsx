/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const Styled = styled.li`

  &:not(:last-child) {
    .upper-menu {
      margin-right: 2.8rem;
    }
  }
  .upper-menu {
    color: ${props => (props.withSlider ? 'rgba(255,255,255,0.7)' : 'rgba(4, 3, 3, 0.7)')};
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  &:hover {
    .child-menu {
      transition:transform 0.3s ease-out;
      height:auto;
      transform:scaleY(1);
      transform-origin:top;
    }
    .upper-menu {
      font-weight: bold;
      color: ${props => (props.withSlider ? 'white' : 'rgba(4, 3, 3, 1)')};
    }
    margin-top: -1px;
  }

  .child-menu {
    transform:scaleY(0);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: absolute;
    font-size: 1.4rem;
    width: 100%;
    left: 0;
    padding-left: 25rem;
    @media (max-width: 1200px) {
      padding-left: 21.7%;
    }
    @media (max-width: 1150px) {
      padding-left: 21%;
    }
    @media (max-width: 1100px) {
      padding-left: 20%;
    }
    a {
      color: ${props => (props.withSlider ? 'rgba(255,255,255,0.7)' : 'rgba(4, 3, 3, 0.7)')};
      font-weight: 500;
      padding: 4rem 4rem 0 0;
    }
  }
  .child-menu > a:hover {
    font-weight: bold;
    color: ${props => (props.withSlider ? 'white' : 'rgba(4, 3, 3, 1)')};

  }

`;


const NavbarDesktopMenuItem = ({ item, withSlider }) => (
  <Styled withSlider={withSlider}>
    <Link href={item.primary.url}>
      <a className="upper-menu">
        {item.primary.name}
      </a>
    </Link>
    <ul className="child-menu">
      {item.items.map(child => (
        <Link href={child.children_url} key={child.children_url}>
          <a>
            {child.children_name}
          </a>
        </Link>
      ))}
    </ul>
  </Styled>
);

NavbarDesktopMenuItem.propTypes = {
  item: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      children_name: PropTypes.string,
      children_url: PropTypes.string,
    })),
    primary: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  }),
  withSlider: PropTypes.bool,
};

NavbarDesktopMenuItem.defaultProps = {
  item: {},
  withSlider: false,
};

export default NavbarDesktopMenuItem;
