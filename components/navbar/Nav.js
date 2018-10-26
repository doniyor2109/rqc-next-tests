import React, {Component} from 'react';
import Link from 'next/link'
import Menu from "../Menu.js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie';

import * as langActions from '../../redux/actions/lang'
import * as logoActions from '../../redux/actions/logo'


import NavbarMenuMobile from './NavbarMenuMobile.js'
import NavbarMenuDesktop from './NavbarMenuDesktop.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faSearch)


class Nav extends Component {

  componentDidMount() {
    const { cookies } = this.props;
    const lang = cookies.get('language')
    this.props.fetchLogo(lang)
  }

  componentDidUpdate(prevProps){
    if(this.props.language.currentLanguage !== prevProps.language.currentLanguage) {
      this.props.fetchLogo(this.props.language.currentLanguage)
    }
  }
  

  render() {
    const {withSlider, switchLanguage} = this.props
    // console.log("nav", this.props)
    return (
      <nav className={withSlider ? "navbar on-slider is-transparent" : "navbar is-transparent"} aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">
                {this.props.logo.item.data &&
                  <img className="logo" src={withSlider ? this.props.logo.item.data.logo_white.url : this.props.logo.item.data.logo_black.url} alt={this.context.t("Логотип Российского Квантового Центра")} />
                }
              </a>
            </Link>
            <div className="navbar-item is-hidden-mobile is-hidden-desktop is-hidden-widescreen is-hidden-fullhd">
              <button onClick={e => {this.handleClick(switchLanguage, "ru", e)}}
                className={ (withSlider ? "is-white opacity080 " : "is-black opacity050 ") + (this.props.language.currentLanguage === 'ru' ? "bold" : "normal")}>
                RU
              </button>
              <p className={withSlider ? "is-white opacity080 " : "is-black opacity050 "}>&nbsp;&nbsp;/&nbsp;&nbsp;</p>
              <button onClick={e => {this.handleClick(switchLanguage, "en-gb", e)}}
              className={(withSlider ? "is-white opacity080 " : "is-black opacity050 ") + (this.props.language.currentLanguage === 'en-gb' ? "bold" : "normal")}>
                EN
              </button>
            </div>
            <button className="navbar-burger"
              onClick={this.isActiveClick}
              data-target="navMenu"
              aria-label="menu"
              aria-expanded="false">
              <span className={withSlider ? "bg-white" : "bg-black"} aria-hidden="true"></span>
              <span className={withSlider ? "bg-white" : "bg-black"} aria-hidden="true"></span>
              <span className={withSlider ? "bg-white" : "bg-black"} aria-hidden="true"></span>
            </button>
          </div>

          <NavbarMenuDesktop Menu={Menu} withSlider={withSlider} switchLanguage={switchLanguage} currentLanguage={this.props.language.currentLanguage}/>

        </div>
        <NavbarMenuMobile Menu={Menu} withSlider={withSlider} switchLanguage={switchLanguage} currentLanguage={this.props.language.currentLanguage}/>

      </nav>
    )
  }

  handleClick = (switchLanguage, lang, e) => {
    e.preventDefault()
    switchLanguage(lang)
  }
  
  isActiveClick = (e) => {
    e.preventDefault();
    document.querySelector('.navbar-burger').classList.toggle('is-active')
    document.getElementById('navMenu').classList.toggle('is-active')
  }
}

const mapStateToProps = state => {
  const { language, logo } = state
  return { logo, language }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
    langActions, 
    logoActions
  ), dispatch)
}

Nav.contextTypes = {
  t: PropTypes.func
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Nav));
