import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Social from "./social.js"


const handleClick = (switchLanguage, lang, e) => {
  e.preventDefault();
  switchLanguage(lang);
}

const NavbarMenuDesktop = (props, context) => {
  const { Menu, withSlider, switchLanguage, currentLanguage } = props
  const items = Menu.map((item, key) =>

    <Link href={item.url} key={key}>
      <a className={(withSlider ? "is-white opacity080" : "is-black opacity050") + " navbar-item"}>
        {context.t(item.name)}
      </a>
    </Link>

  )
    return (
        <div className="navbar-menu">
          <div className="navbar-start">
            {items}
          </div>
          <div className="navbar-end">
            <button className={(withSlider ? "is-white opacity080" : "is-black opacity050") + " navbar-item"}>
              <img src={withSlider ? "/static/search_white.svg" : "/static/search_gray.svg"} alt="Поиск по сайту" />
            </button>
            <Social withSlider={withSlider}/>
            <div className="navbar-item has-dropdown is-hoverable">
              <button className={(withSlider ? "is-white opacity080" : "is-black") + " navbar-link"}>
                {currentLanguage === "ru" ? "RU" : "EN"}
              </button>
              <div className="navbar-dropdown">
                <button className={(withSlider ? "is-white opacity080" : "is-black opacity050") + " navbar-item"}
                    onClick={e => {handleClick(switchLanguage, "en-gb", e)}}>
                  EN
                </button>
                <button className={(withSlider ? "is-white opacity080" : "is-black opacity050") + " navbar-item"}
                    onClick={e => {handleClick(switchLanguage, "ru", e)}}>
                  RU
                </button>
              </div>
            </div>
          </div>
        </div>
      )
  }
  
NavbarMenuDesktop.contextTypes = {
  t: PropTypes.func
}


export default NavbarMenuDesktop
