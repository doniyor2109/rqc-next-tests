import React, {Component, Fragment} from 'react';
import Link from 'next/link'
import Menu from "../Menu.js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import CookieConsent from "react-cookie-consent"

import * as langActions from '../../redux/actions/lang'

import NavbarMenuMobile from './NavbarMenuMobile.js'
import NavbarMenuDesktop from './NavbarMenuDesktop.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { relative } from 'upath';

library.add(faChevronDown, faSearch)


class Nav extends Component {

  render() {
    const {router, switchLanguage, lang, cookieConsent} = this.props
    const withSlider = router.pathname === "/"
    // console.log("nav", this.props)
    return (
      <Fragment>
      {!cookieConsent && 
        <CookieConsent  location="top"
                        buttonText="OK"
                        cookieName="useragreedwithcookies"
                        style={{ background: '#3998D1', color: 'white', fontSize: '1.3rem', position: 'relative'}}
                        buttonStyle={{ background: '#3998D1', color: 'white', border: '2px solid white',fontSize: '1.3rem', cursor: 'pointer' }}
                        expires={150}>
          {this.context.t("На нашем сайте в целях хранения настроек и показа статей и новостей на выбранном вами языке используются файлы cookie. Нажимая кнопку ОК, вы соглашаетесь с этим")}
        </CookieConsent>
      }

        <nav className={withSlider ? "navbar on-slider is-transparent" : "navbar is-transparent"} aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link href="/">
                <a className="navbar-item">
                  {lang === "ru" 
                  ? <img className="logo" src={withSlider ? "/static/RQClogo_white_ru.svg" : "/static/RQClogo_black_ru.svg"} alt="Логотип Российского Квантового Центра"/>
                  : <img className="logo" src={withSlider ? "/static/RQClogo_white_en.svg" : "/static/RQClogo_black_en.svg"} alt="Логотип Российского Квантового Центра"/>
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

            <NavbarMenuDesktop Menu={Menu} withSlider={withSlider} switchLanguage={switchLanguage} currentLanguage={this.props.lang}/>

          </div>

          <NavbarMenuMobile Menu={Menu} 
                            withSlider={withSlider} 
                            switchLanguage={switchLanguage} 
                            currentLanguage={this.props.lang}
          />

      </nav>
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
