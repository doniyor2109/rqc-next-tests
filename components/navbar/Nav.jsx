/* eslint-disable react/no-did-update-set-state */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { withRouter } from 'next/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import CookieConsent from '../shared/CookieConsent'

import * as langActions from '../../redux/actions/lang'

import NavbarMenuMobile from './mobile/NavbarMenuMobile'
import NavbarMenuDesktop from './desktop/NavbarMenuDesktop'
import SearchPopup from './desktop/SearchPopup'
import Logo from './Logo'
import Styled from './styled'

library.add(faChevronDown, faSearch)

class Nav extends Component {
  static propTypes = {
    router: PropTypes.shape({
      route: PropTypes.string,
    }),
    cookieConsent: PropTypes.bool,
    switchLanguage: PropTypes.func.isRequired,
    lang: PropTypes.string,
    phone: PropTypes.string,
    tablet: PropTypes.string,
    menu: PropTypes.shape({
      isFetching: PropTypes.bool,
      item: PropTypes.shape({
        data: PropTypes.shape({
          body: PropTypes.arrayOf(
            PropTypes.shape({
              items: PropTypes.arrayOf(
                PropTypes.shape({
                  children_name: PropTypes.string,
                  children_url: PropTypes.string,
                })
              ),
              primary: PropTypes.shape({
                name: PropTypes.string,
                url: PropTypes.string,
              }),
            })
          ),
        }),
      }),
    }),
  }

  static defaultProps = {
    router: {
      route: '/',
    },
    cookieConsent: false,
    lang: 'ru',
    menu: {},
    phone: null,
    tablet: null,
  }

  constructor(props) {
    super(props)
    const { cookieConsent } = this.props
    this.state = {
      cookieConsent,
      searchisActive: false,
      withSlider: false,
    }
  }

  componentDidMount() {
    const { router } = this.props
    const { route } = router
    if (route === '/') {
      this.setState({
        withSlider: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { router } = this.props
    const { route } = router
    if (route !== prevProps.router.route) {
      if (route === '/') {
        this.setState({
          withSlider: true,
        })
      } else {
        this.setState({
          withSlider: false,
        })
      }
    }
  }

  okwithcookies = () => {
    document.cookie =
      'useragreedwithcookies=true;Expires=Wed, 22 Oct 2025 07:28:00 GMT'
    this.setState({
      cookieConsent: true,
    })
  }

  searchClick = () => {
    const { searchisActive } = this.state
    this.setState({
      searchisActive: !searchisActive,
    })
  }

  render() {
    const { switchLanguage, lang, phone, tablet, menu } = this.props
    const { withSlider, cookieConsent, searchisActive } = this.state

    // console.log('nav', this.props);

    return (
      <Fragment>
        {!cookieConsent && <CookieConsent okwithcookies={this.okwithcookies} />}
        <Styled withSlider={withSlider}>
          <Media
            query="(min-width: 1025px)"
            defaultMatches={phone === null && tablet === null}
            render={() => (
              <div className="container">
                <Logo withSlider={withSlider} lang={lang} />
                <NavbarMenuDesktop
                  menu={menu.item.data && menu.item.data.body}
                  withSlider={withSlider}
                  switchLanguage={switchLanguage}
                  currentLanguage={lang}
                  searchClick={this.searchClick}
                />
                <SearchPopup close={this.searchClick} active={searchisActive} />
              </div>
            )}
          />
          <Media
            query="(max-width: 1024px)"
            defaultMatches={phone !== null || tablet !== null}
            render={() => (
              <>
                <Logo withSlider={withSlider} lang={lang} mobile />
                <NavbarMenuMobile
                  menu={menu.item.data && menu.item.data.body}
                  withSlider={withSlider}
                  switchLanguage={switchLanguage}
                  currentLanguage={lang}
                />
              </>
            )}
          />
        </Styled>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { lang } = state.i18nState
  const { menu } = state
  return { lang, menu }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, langActions), dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
