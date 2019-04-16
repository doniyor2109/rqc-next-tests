/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Logo = ({ lang }) => (
  <div className="column is-2-desktop is-2-tablet is-6-mobile">
    <Link href="/">
      <a>
        {lang === 'ru'
          ? <img src="/static/footer_logo_ru.svg" alt="" />
          : <img src="/static/footer_logo_en.svg" alt="" />
        }
      </a>
    </Link>
  </div>
);

Logo.propTypes = {
  lang: PropTypes.string,
};

Logo.defaultProps = {
  lang: 'ru',
};
export default Logo;
