import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hostName from '../../host';

const PeopleHead = ({ fbLocale }, { t }) => (
  <Head>
    <title>{t('Коллектив Центра')}</title>
    <meta property="og:url" content={`${hostName}/people`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={`${hostName}/static/unusov.png`} />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fbLocale === 'undefined' || fbLocale === 'ru_RU')
        && (
        <Fragment>
          <meta property="og:locale" content="ru_RU" />
          <meta property="og:title" content="Коллектив Центра" />
          <meta property="og:description" content="Администрация, Попечительский и Научный совет Российского Квантового Центра" />
        </Fragment>
        )
    }
    {fbLocale === 'en_US'
        && (
        <Fragment>
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="Employees of the Center" />
          <meta property="og:description" content="Administration, Boards of Trustees, and Scientific Committee of the RQC" />
        </Fragment>
        )
    }
  </Head>
);

PeopleHead.contextTypes = {
  t: PropTypes.func,
};

PeopleHead.propTypes = {
  fbLocale: PropTypes.string,
};

PeopleHead.defaultProps = {
  fbLocale: 'undefined',
};
export default PeopleHead;
