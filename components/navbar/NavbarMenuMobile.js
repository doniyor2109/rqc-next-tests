import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuWithDropdown from "./MenuWithDropdown.js"
import Social from "./social.js"
import Router from 'next/router'

class NavbarMenuMobile extends React.Component {

  state = {
    searchtext: ''
  }

  render() {

    const { Menu, switchLanguage, currentLanguage, menuClick } = this.props
  
    return (
  
      <div className="navbar-menu is-hidden-desktop is-hidden-widescreen is-hidden-fullhd" id="navMenu">
        <div className="navbar-item language">
          <button onClick={e => {this.handleClick(switchLanguage, "ru", e)}}
              className={currentLanguage === 'ru' ? "bold" : "normal"}>
            RU
          </button><p>&nbsp;&nbsp;/&nbsp;&nbsp;</p>
          <button onClick={e => {this.handleClick(switchLanguage, "en-gb", e)}}
              className={currentLanguage === 'en-gb' ? "bold" : "normal"}>
            EN
          </button>
        </div>

        {/* Поиск */}
        <div className="mobile_search_container is-left">
          <form className="search_form" onSubmit={e => this.handleSubmit(e)}>
            <input type="text" 
                   placeholder="Поиск" 
                   value={this.state.searchtext}
                   onChange={e => this.handleChange(e)}
            />
                <button type="submit" id="mobile-search-submit-button"></button>
          </form>
        </div> 
        {/* Поиск */}

        <MenuWithDropdown Menu={Menu} />
        <hr className="dropdown-divider" />
        <Social color="gray"/>
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({
        searchtext: e.target.value
    })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      Router.push('/search?text=' + this.state.searchtext, '/search/' + this.state.searchtext)
      document.getElementById('navMenu').classList.remove('is-active');
      document.querySelector('.navbar-burger').classList.remove('is-active');
  }

  handleClick = (switchLanguage, lang, e) => {
    e.preventDefault();
    switchLanguage(lang);
    document.getElementById('navMenu').classList.remove('is-active');
    document.querySelector('.navbar-burger').classList.remove('is-active');
  }
}

export default NavbarMenuMobile
