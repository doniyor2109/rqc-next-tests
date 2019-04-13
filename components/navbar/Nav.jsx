import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import Menu from '../Menu';
import CookieConsent from '../shared/CookieConsent';

import * as langActions from '../../redux/actions/lang';

import NavbarMenuMobile from './NavbarMenuMobile';
import NavbarMenuDesktop from './NavbarMenuDesktop';
import SearchPopup from './SearchPopup';


library.add(faChevronDown, faSearch);

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookieConsent: this.props.cookieConsent,
      searchisActive: false,
      withSlider: false,
    };
  }

  componentDidMount() {
    if (this.props.router.route === '/') {
      this.setState({
        withSlider: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.router.route !== prevProps.router.route) {
      // console.log('nav', this.props.router.route);
      if (this.props.router.route === '/') {
        this.setState({
          withSlider: true,
        });
      } else {
        this.setState({
          withSlider: false,
        });
      }
    }

    const { hash } = window.location;
    const elmnt = document.getElementById(hash.slice(1));
    if (elmnt) {
      elmnt.scrollIntoView();
    }
  }

  render() {
    const { switchLanguage, lang } = this.props;
    // console.log("nav render")

    return (
      <Fragment>
        {!this.state.cookieConsent
        && <CookieConsent okwithcookies={this.okwithcookies} />
      }

        <nav className={this.state.withSlider ? 'navbar on-slider is-transparent' : 'navbar is-transparent'} aria-label="main navigation">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">
                {lang === 'ru'
                  ? <img className={this.state.withSlider ? 'mainlogo_ru' : 'logo'} src={this.state.withSlider ? '/static/RQClogo_white_ru.svg' : '/static/RQClogo_black_ru.svg'} alt="Логотип Российского Квантового Центра" />
                  : <img className={this.state.withSlider ? 'mainlogo_en' : 'logo'} src={this.state.withSlider ? '/static/RQClogo_white_en.svg' : '/static/RQClogo_black_en.svg'} alt="Логотип Российского Квантового Центра" />
                  }
              </a>
            </Link>

            {/* переключатель языка для Ipad */}
            <div className="navbar-item is-hidden-mobile is-hidden-desktop is-hidden-widescreen is-hidden-fullhd">
              <button
                onClick={(e) => { this.handleClick(switchLanguage, 'ru', e); }}
                className={(this.state.withSlider ? 'is-white opacity080 ' : 'is-black opacity050 ') + (this.props.lang === 'ru' ? 'bold' : 'normal')}
              >
                  RU
              </button>
              <p className={this.state.withSlider ? 'is-white opacity080 ' : 'is-black opacity050 '}>&nbsp;&nbsp;/&nbsp;&nbsp;</p>
              <button
                onClick={(e) => { this.handleClick(switchLanguage, 'en-gb', e); }}
                className={(this.state.withSlider ? 'is-white opacity080 ' : 'is-black opacity050 ') + (this.props.lang === 'en-gb' ? 'bold' : 'normal')}
              >
                  EN
              </button>
            </div>
            <button
              className="navbar-burger"
              onClick={this.isActiveClick}
              data-target="navMenu"
              aria-label="menu"
              aria-expanded="false"
            >
              <span className={this.state.withSlider ? 'bg-white' : 'bg-black'} aria-hidden="true" />
              <span className={this.state.withSlider ? 'bg-white' : 'bg-black'} aria-hidden="true" />
              <span className={this.state.withSlider ? 'bg-white' : 'bg-black'} aria-hidden="true" />
            </button>
          </div>

          <NavbarMenuDesktop
            Menu={Menu}
            withSlider={this.state.withSlider}
            switchLanguage={switchLanguage}
            currentLanguage={this.props.lang}
            searchClick={this.searchClick}
          />

          <NavbarMenuMobile
            Menu={Menu}
            withSlider={this.state.withSlider}
            switchLanguage={switchLanguage}
            currentLanguage={this.props.lang}
          />

        </nav>
        <div className="search-popup">
          <SearchPopup
            close={this.searchClose}
            active={this.state.searchisActive}
          />
        </div>
      </Fragment>
    );
  }

  handleClick = (switchLanguage, lang, e) => {
    e.preventDefault();
    switchLanguage(lang);
  }

  isActiveClick = (e) => {
    e.preventDefault();
    document.querySelector('.navbar-burger').classList.toggle('is-active');
    document.getElementById('navMenu').classList.toggle('is-active');
  }

  okwithcookies = (e) => {
    e.preventDefault();
    document.cookie = 'useragreedwithcookies=true;Expires=Wed, 22 Oct 2025 07:28:00 GMT';
    this.setState({
      cookieConsent: true,
    });
  }

  searchClick = (e) => {
    e.preventDefault();
    this.setState({
      searchisActive: true,
    });
  }

  searchClose = (e) => {
    this.setState({
      searchisActive: false,
    });
  }
}

const mapStateToProps = (state) => {
  const { lang } = state.i18nState;
  return { lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  langActions), dispatch);

Nav.contextTypes = {
  t: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
