import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import * as langActions from '../../redux/actions/lang';

import Logo from './Logo';
import FooterMenu from './Menu';
import Partners from './Partners';
import Credentials from './Credentials';
import LangSelector from './LangSelector';

const FooterStyled = styled.footer`
  background-color: #444444;
  padding: 3.5rem 0 14.5rem;
  @media (min-width: 416px) and (max-width: 768px){
    padding:5rem 0 11.5rem;
  }
  @media (max-width: 415px) {
    padding: 3.5rem 0 5rem;
    .firstrow {
      .column:nth-child(3) {
        order: 2;
      }
      .column:nth-child(2) {
        order: 3;
      }
    }
  }
  
`;

const Footer = ({ lang, switchLanguage }) => (
  <FooterStyled>
    <div className="container">
      <div className="columns firstrow is-mobile is-multiline">
        <Logo lang={lang} />
        <FooterMenu />
        <LangSelector lang={lang} switchLanguage={switchLanguage} />
      </div>
      <div className="columns is-mobile">
        <Credentials />
      </div>
      <div className="columns">
        <Partners lang={lang} />
      </div>
    </div>
  </FooterStyled>
);


const mapStateToProps = (state) => {
  const { lang } = state.i18nState;
  return { lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  langActions), dispatch);

Footer.contextTypes = {
  t: PropTypes.func,
};

Footer.propTypes = {
  lang: PropTypes.string,
  switchLanguage: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  lang: 'ru',
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
