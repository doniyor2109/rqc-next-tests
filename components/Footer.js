import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as langActions from '../redux/actions/lang'

import Menu from './Menu'

const FooterMenuItem = ({children, products}, context) => {

  const fitems = children.map((item, key) =>
    <Link href={item.url} key={key} scroll={true}>
      <a className="footer-menu-item" target={products ? "_blank" : "_self"} rel={products ? "noopener noreferrer" : "undefined"}>
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
      <Link href={item.url} scroll={true}>
        <a>
          <h5>{context.t(item.name)}</h5>
        </a>
      </Link>
      <hr className="footer_menu_hr"/>
      <FooterMenuItem children={item.children} products={item.name === "Продукты" ? true : false}/>
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
                  {props.lang === "ru" 
                  ?
                    <img src="/static/footer_logo_ru.svg" alt="" />
                  : 
                    <img src="/static/footer_logo_en.svg" alt="" />
                  }
                </a>
              </Link>
            </div>
          </div>
          <div className="left_down">
            <p>&copy;2010-{moment(Date.now()).format('YYYY')}</p>
            <p>{context.t("Российский Квантовый Центр")}</p>
          </div>
        </div>
        <div className="middle_part">
          <FooterMenu Menu = {Menu}/>
          <div className="middle_down_mobile">
            <p>&copy;2010-{moment(Date.now()).format('YYYY')}</p>
            <p>{context.t("Российский Квантовый Центр")}</p>
          </div>
          <hr className="bottom_hr"/>
            {props.lang === "ru" 
                  ? 
                    <div className="partners ru">
                      <a href="http://misis.ru/" target="_blank" rel="noopener noreferrer"> 
                        <img src="/static/misis-rus.svg" alt="" />  
                      </a>
                      <a href="https://minobrnauki.gov.ru/" target="_blank" rel="noopener noreferrer">       
                        <img src="/static/MinObr-rus_new.svg" alt="" />
                      </a>
                      <a href="https://www.gazprombank.ru/" target="_blank" rel="noopener noreferrer">   
                        <img src="/static/Gazprombank-rus.svg"  alt="" />
                      </a>
                      <a href="https://sk.ru/" target="_blank" rel="noopener noreferrer">
                          <img src="/static/Sk-rus.svg"  alt="" />
                      </a>
                    </div>
                  :                     
                  <div className="partners en">
                    <a href="http://misis.ru/" target="_blank" rel="noopener noreferrer"> 
                      <img src="/static/misis-eng.svg"  alt="" />  
                    </a>
                    <a href="https://minobrnauki.gov.ru/" target="_blank" rel="noopener noreferrer">       
                      <img src="/static/MinObr-eng_new.svg" alt="" />
                    </a>
                    <a href="https://www.gazprombank.ru/" target="_blank" rel="noopener noreferrer">   
                      <img src="/static/Gazprombank-eng.svg" alt="" />
                    </a>
                    <a href="https://sk.ru/" target="_blank" rel="noopener noreferrer">
                        <img src="/static/Sk-eng.svg"  alt="" />
                    </a>
                  </div>
                  }

        </div>
        <div className="right_part">
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button className="navbar-link" aria-haspopup="true" aria-controls="dropdown-menu4">
                {props.lang === "ru" ? "RU" : "EN"}
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
              <div className="dropdown-content">
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
