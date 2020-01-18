import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NavbarDesktopMenuItem from './desktop/NavbarDesktopMenuItem'

const Styled = styled.ul`
  order: 1;
  padding-top: 4rem;
  display: flex;
  flex-direction: row;
  margin: 0 auto 0 4.7rem;
  @media (max-width: 1150px) {
    margin: 0;
  }
`

const Menu = ({ withSlider, menu }) => (
  <Styled>
    {menu.map(item => (
      <NavbarDesktopMenuItem
        item={item}
        withSlider={withSlider}
        key={item.primary.name}
        products={item.primary.name === 'Продукты' || 'Products'}
      />
    ))}
  </Styled>
)

Menu.propTypes = {
  withSlider: PropTypes.bool,
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

Menu.defaultProps = {
  withSlider: false,
  menu: [],
}

export default Menu
