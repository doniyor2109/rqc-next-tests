/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Menu from '../Menu';

const FooterMenuItem = ({ children, products }, { t }) => (
  <div>
    {children.map(item => (
      <Link href={item.url} key={item.name}>
        <a
          className="footer-menu-item"
          target={products ? '_blank' : '_self'}
          rel={products ? 'noopener noreferrer' : 'undefined'}
        >
          {t(item.name)}
        </a>
      </Link>
    ))}
  </div>
);

FooterMenuItem.propTypes = {
  products: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

FooterMenuItem.defaultProps = {
  products: false,
};

FooterMenuItem.contextTypes = {
  t: PropTypes.func,
};

const Columns = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 7rem;
    @media (min-width: 416px) and (max-width: 768px){
        flex-wrap: wrap;
    }
    @media (max-width: 415px) {
        flex-wrap: wrap;
        margin-top: 3.5rem;
        padding-bottom: 0;
    }
`;

const Column = styled.div`
    display: inline-block;
    width: 13%;
    margin-right: 2rem;
    @media (min-width: 416px) and (max-width: 768px){
        width: 10rem;
        margin-bottom: 6rem;
        padding-top: 1rem;
    }
    @media (max-width: 415px) {
        width: 45%;
        margin-bottom: 5rem;

        &:nth-child(odd) {
            margin-right: 3rem;
        }
        &:nth-child(even) {
            margin-right: 0;
        }
    }

    h5 {
        color: white;
        font-size: 1.4rem;
    }

    .footer_menu_hr {
        background-color:rgba(255,255,255,0.5);
        height:1px;
        margin-top: 2.5rem;
        margin-bottom: 2.6rem;
    }

    a.footer-menu-item {
        display: block;
        color: white;
        font-size: 1.2rem;
        margin-bottom: 1.7rem;
    }

    a.footer-menu-item:hover {
        color: white;
    }
`;

const FooterMenu = (props, { t }) => (
  <div className="column is-9-desktop is-9-tablet is-12-mobile">
    <Columns>
      {Menu.map(item => (
        <Column key={item.name}>
          <Link href={item.url}>
            <a>
              <h5>{t(item.name)}</h5>
            </a>
          </Link>
          <hr className="footer_menu_hr" />
          <FooterMenuItem products={item.name === 'Продукты'}>
            {item.children}
          </FooterMenuItem>
        </Column>
      ))}
    </Columns>
  </div>
);

FooterMenu.contextTypes = {
  t: PropTypes.func,
};

export default FooterMenu;
