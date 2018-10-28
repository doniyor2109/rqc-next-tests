import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as langActions from '../redux/actions/lang'

import Menu from './Menu'

const FooterMenuItem = ({children}, context) => {

  const fitems = children.map((item, key) =>
    <Link href={item.url} key={key}>
      <a className="footer-menu-item">
        {context.t(item.name)}
      </a>
    </Link>
  )
  return (
    <div>
      {fitems}
    </div>
  )}


const FooterMenu = ({Menu}, context) => {

  const items = Menu.map((item, key) =>
    <div className="Menu_column" key={key}>
      <Link href={item.url}>
        <a>
          <h5>{context.t(item.name)}</h5>
        </a>
      </Link>
      <hr className="footer_menu_hr"/>
      <FooterMenuItem children={item.children} />
    </div>
  )
  return (
    <div className="footer_menu">
      {items}
    </div>
  )
}

const handleClick = (switchLanguage, lang, e) => {
  e.preventDefault();
  switchLanguage(lang);
}

const Footer = (props, context) => (
  <footer>
    <div className="container">
      <div className="footer_box">
        <div className="left_part">
          <div className="left_top">
            <div className="footer_brand">
              <Link href="/">
                <a>
                  {context.t("Российский Квантовый Центр")}
                </a>
              </Link>
            </div>
          </div>
          <div className="left_down">
            <p>&copy;2013-2018</p>
            <p>Russian&nbsp;Quantum&nbsp;Center</p>
          </div>
        </div>
        <div className="middle_part">
          <FooterMenu Menu = {Menu}/>
          <hr className="bottom_hr"/>
            <div className="partners">
              <a href="https://www.gazprombank.ru/" target="_blank" rel="noopener noreferrer">   
                <img src="/static/gazprombank.svg" target="_blank" rel="noopener noreferrer" alt="Логотип Газпромбанка" />
              </a>
              <a href="http://misis.ru/"> 
                <img src="/static/misis.svg" target="_blank" rel="noopener noreferrer" alt="Логотип МИСИС" />  
              </a>
              <a href="https://xn--80abucjiibhv9a.xn--p1ai/">       
                <img src="/static/minobr.svg" target="_blank" rel="noopener noreferrer" alt="Логотип министерства образования РФ" />
              </a>
              <a href="https://sk.ru/technopark/">
                  <img src="/static/sk.svg" target="_blank" rel="noopener noreferrer" alt="Логотип Сколково" />
              </a>
            </div>
        </div>
        <div className="right_part">
          <div className="navbar-item has-dropdown is-hoverable">
            <button className="navbar-link">
              {props.lang === "ru" ? "RU" : "EN"}
            </button>
            <div className="navbar-dropdown">
              <button className="navbar-item" onClick={e => {handleClick(props.switchLanguage, "en-gb", e)}}>
                EN
              </button>
              <button className="navbar-item" onClick={e => {handleClick(props.switchLanguage, "ru", e)}}>
                RU
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright is-hidden-desktop is-hidden-widescreen is-hidden-fullhd">
        <p>&copy;2013-2018</p>
        <p>Russian Quantum Center</p>
      </div>
    </div>
  </footer>
)

const mapStateToProps = state => {
  const { lang } = state.i18nState
  return { lang }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
    langActions
  ), dispatch)
}

Footer.contextTypes = {
  t: PropTypes.func
}

FooterMenu.contextTypes = {
  t: PropTypes.func
}

FooterMenuItem.contextTypes = {
  t: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
