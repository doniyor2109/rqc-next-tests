import React, {Component, Fragment} from 'react';
import Link from 'next/link'
import Menu from "../Menu.js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import CookieConsent from "../shared/CookieConsent"

import * as langActions from '../../redux/actions/lang'

import NavbarMenuMobile from './NavbarMenuMobile'
import NavbarMenuDesktop from './NavbarMenuDesktop'
import SearchPopup from './SearchPopup'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faSearch)


class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      DOMLoaded: false,
      cookieConsent: this.props.cookieConsent, 
      searchisActive: false
    }
  }


  componentDidMount() {
    this.setState({
      DOMLoaded: true
    })
  }

  render() {
    const {router, switchLanguage, lang} = this.props

    // пока загружается дом переменная withSlider будет false
    // чтобы показывать на белом фоне серый логотип, а иначе его не видно и это плохо
    const withSlider = !this.state.DOMLoaded ? false : router.pathname === "/"

    return (
      <Fragment>
      {!this.state.cookieConsent && 
        <CookieConsent okwithcookies={this.okwithcookies}/>
      }

        <nav className={withSlider ? "navbar on-slider is-transparent" : "navbar is-transparent"} aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link href="/">
                <a className="navbar-item">
                  {lang === "ru" 
                  ? <img className={withSlider ? "mainlogo_ru" : "logo"} src={withSlider ? "/static/RQClogo_white_ru.svg" : "/static/RQClogo_black_ru.svg"} alt="Логотип Российского Квантового Центра"/>
                  : <img className={withSlider ? "mainlogo_en" : "logo"} src={withSlider ? "/static/RQClogo_white_en.svg" : "/static/RQClogo_black_en.svg"} alt="Логотип Российского Квантового Центра"/>
                  }
                </a>
              </Link>

              {/* переключатель языка для Ipad */}
              <div className="navbar-item is-hidden-mobile is-hidden-desktop is-hidden-widescreen is-hidden-fullhd">
                <button onClick={e => {this.handleClick(switchLanguage, "ru", e)}}
                  className={ (withSlider ? "is-white opacity080 " : "is-black opacity050 ") + (this.props.lang === 'ru' ? "bold" : "normal")}>
                  RU
                </button>
                <p className={withSlider ? "is-white opacity080 " : "is-black opacity050 "}>&nbsp;&nbsp;/&nbsp;&nbsp;</p>
                <button onClick={e => {this.handleClick(switchLanguage, "en-gb", e)}}
                className={(withSlider ? "is-white opacity080 " : "is-black opacity050 ") + (this.props.lang === 'en-gb' ? "bold" : "normal")}>
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

            <NavbarMenuDesktop Menu={Menu} 
                               withSlider={withSlider} 
                               switchLanguage={switchLanguage} 
                               currentLanguage={this.props.lang}
                               searchClick={this.searchClick}
            />

          </div>

          <NavbarMenuMobile Menu={Menu} 
                            withSlider={withSlider} 
                            switchLanguage={switchLanguage} 
                            currentLanguage={this.props.lang}
          />

      </nav>
      <div className="search-popup">
        <SearchPopup close={this.searchClose} 
                    active={this.state.searchisActive} 
        />
      </div>
    </Fragment>
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

  okwithcookies = (e) => {
    e.preventDefault()
    document.cookie = "useragreedwithcookies=true"
    this.setState({
      cookieConsent: true
    })
  }

  searchClick = (e) => {
    e.preventDefault()
    this.setState({
      searchisActive: true
    })
  }

  searchClose = (e) => {
    this.setState({
      searchisActive: false
    })
  }
}

const mapStateToProps = state => {
  const { lang } = state.i18nState
  return { lang }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
    langActions
  ), dispatch)
}

Nav.contextTypes = {
  t: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
