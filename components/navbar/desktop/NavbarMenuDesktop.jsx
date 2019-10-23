import React from 'react';
import PropTypes from 'prop-types';
import Social from '../social';
import SearchIcon from './SearchIcon';
import LanguageSwitch from '../../shared/LanguageSwitch';
import Menu from '../Menu';


const NavbarMenuDesktop = ({
  menu, withSlider, switchLanguage, currentLanguage, searchClick,
}) => (
  <>
    <Menu menu={menu} withSlider={withSlider} />
    <SearchIcon
      onClick={searchClick}
    />
    <Social withSlider={withSlider} />
    <LanguageSwitch
      switchLanguage={switchLanguage}
      currentLanguage={currentLanguage}
      withSlider={withSlider}
    />
  </>
);

NavbarMenuDesktop.contextTypes = {
  t: PropTypes.func,
};

NavbarMenuDesktop.propTypes = {
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
  withSlider: PropTypes.bool,
  switchLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
  searchClick: PropTypes.func.isRequired,
};

NavbarMenuDesktop.defaultProps = {
  menu: [],
  withSlider: false,
  currentLanguage: 'ru',
};

export default NavbarMenuDesktop;
