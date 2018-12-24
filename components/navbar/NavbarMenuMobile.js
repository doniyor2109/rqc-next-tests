import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuWithDropdown from "./MenuWithDropdown.js"
import Social from "./social.js"

const handleClick = (switchLanguage, lang, e) => {
  e.preventDefault();
  switchLanguage(lang);
  document.getElementById('navMenu').classList.remove('is-active');
  document.querySelector('.navbar-burger').classList.remove('is-active');
}

const NavbarMenuMobile = (props, context) => {

  const { Menu, switchLanguage, currentLanguage, menuClick } = props

  return (

    <div className="navbar-menu is-hidden-desktop is-hidden-widescreen is-hidden-fullhd" id="navMenu">
      <div className="navbar-item language">
        <button onClick={e => {handleClick(switchLanguage, "ru", e)}}
            className={currentLanguage === 'ru' ? "bold" : "normal"}>
          RU
        </button><p>&nbsp;&nbsp;/&nbsp;&nbsp;</p>
        <button onClick={e => {handleClick(switchLanguage, "en-gb", e)}}
            className={currentLanguage === 'en-gb' ? "bold" : "normal"}>
          EN
        </button>
      </div>
      {/* Поиск */}
      <div className="mobile_search_container is-left">
        <FontAwesomeIcon icon="search" size="2x" />
        <input type="text" placeholder="Поиск" />
      </div> 
      <MenuWithDropdown Menu={Menu} />
      <hr className="dropdown-divider" />
      <Social color="gray"/>
    </div>
    )
  }

export default NavbarMenuMobile
