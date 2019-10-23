import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BurgerButton from './BurgerButton';
import Collapse from './Collapse';

const NavbarMenuMobile = ({
  menu, switchLanguage, currentLanguage, withSlider,
}) => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  function showMenu() {
    setMenuOpen(!menuIsOpen);
  }

  // console.log('mobile menu', menuIsOpen);
  return (
    <>
      <BurgerButton
        onClick={showMenu}
        withSlider={withSlider}
        isActive={menuIsOpen}
      />
      {menuIsOpen
          && (
          <Collapse
            switchLanguage={switchLanguage}
            currentLanguage={currentLanguage}
            menu={menu}
            close={showMenu}
          />
          )
        }
    </>
  );
};


NavbarMenuMobile.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      children_name: PropTypes.string,
      children_url: PropTypes.string,
    })),
    primary: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  })),
  switchLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
  withSlider: PropTypes.bool,
};

NavbarMenuMobile.defaultProps = {
  menu: [],
  currentLanguage: 'ru',
  withSlider: false,
};


export default NavbarMenuMobile;
