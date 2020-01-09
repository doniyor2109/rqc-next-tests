/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import FooterMenuItem from './FooterMenuItem'

const Columns = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 7rem;
  @media (min-width: 416px) and (max-width: 768px) {
    flex-wrap: wrap;
  }
  @media (max-width: 415px) {
    flex-wrap: wrap;
    margin-top: 3.5rem;
    padding-bottom: 0;
  }
`

const Column = styled.div`
  display: inline-block;
  width: 13%;
  margin-right: 2rem;
  @media (min-width: 416px) and (max-width: 768px) {
    width: 10rem;
    margin-bottom: 6rem;
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
    background-color: rgba(255, 255, 255, 0.5);
    height: 1px;
    margin-top: 2.5rem;
    margin-bottom: 2.6rem;
  }

  .footer-menu-item {
    display: block;
    color: white;
    font-size: 1.2rem;
    margin-bottom: 1.7rem;
  }
`

const FooterMenu = ({ menu }) => (
  <div className="column is-9-desktop is-9-tablet is-12-mobile">
    <Columns>
      {menu.map(item => (
        <Column key={item.primary.name}>
          <Link href={item.primary.url}>
            <a>
              <h5>{item.primary.name}</h5>
            </a>
          </Link>
          <hr className="footer_menu_hr" />
          <FooterMenuItem products={item.primary.name === 'Продукты'}>
            {item.items}
          </FooterMenuItem>
        </Column>
      ))}
    </Columns>
  </div>
)

FooterMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          children_name: PropTypes.string,
          children_url: PropTypes.string,
        })
      ),
      primary: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    })
  ),
}

FooterMenu.defaultProps = {
  menu: {},
}

export default FooterMenu
