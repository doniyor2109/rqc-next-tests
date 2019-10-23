import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  height: 7rem;
  background-color: #3998D1;
  position: relative;
  top: 1rem;
  width: 100%;
  z-index: 31;

  p {
    font-size: 1.2rem;
    line-height: 1.6rem;
    color:white;
    margin-top: 0.5rem;
  }

  button {
    border: 2px solid white;
    font-size: 1.4rem;
    line-height: 2rem;
    text-transform: uppercase;
    color: white;
    text-align: center;
    position: relative;
    width: 100%;
    background-color: transparent;
    height: 3.5rem;
    cursor: pointer;   
    font-weight: 500;
    margin-top: 0.5rem;
  }
`

const CookieConsent = ({ okwithcookies }, { t }) => (
  <Styled>
    <div className="container">
      <div className="columns is-mobile">
        <div className="column is-8-desktop is-offset-1-desktop is-8-tablet is-9-mobile">
          <p>
            {t('На нашем сайте в целях хранения настроек и показа статей и новостей на выбранном вами языке используются файлы cookie. Нажимая кнопку ОК, вы соглашаетесь с этим.')}
          </p>
        </div>
        <div className="column is-2-desktop is-3-mobile">
          <button
            onClick={okwithcookies}
            type="button"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </Styled>
);

CookieConsent.contextTypes = {
  t: PropTypes.func,
};

CookieConsent.propTypes = {
  okwithcookies: PropTypes.func.isRequired,
};

export default CookieConsent;
