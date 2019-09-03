import React from 'react';
import PropTypes from 'prop-types';

const CookieConsent = ({ okwithcookies }, { t }) => (
  <div className="cookie-consent">
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
  </div>
);

CookieConsent.contextTypes = {
  t: PropTypes.func,
};

CookieConsent.propTypes = {
  okwithcookies: PropTypes.func.isRequired,
};

export default CookieConsent;
