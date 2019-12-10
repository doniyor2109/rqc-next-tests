/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import hostName from '../../host';


const LogosHead = ({ fb_locale }, { t }) => (
  <Head>
    <title>{t('Логотипы РКЦ')}</title>
    <meta name="description" content={t('Здесь можно скачать логотипы РКЦ в разных форматах')} />
    <meta property="og:url" content={`${hostName}/logo`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://images.prismic.io/rqc1%2F53262c2e-fdd7-4d2e-b938-b3b6046c1b72_rqc_black_logo_rus.svg?auto=compress,format" />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fb_locale === 'undefined' || fb_locale === 'ru_RU')
        && (
        <>
          <meta property="og:locale" content="ru_RU" />
          <meta property="og:title" content="Логотипы РКЦ" />
          <meta property="og:description" content="Здесь можно скачать логотипы РКЦ в разных форматах" />
        </>
        )
    }
    {fb_locale === 'en_US'
        && (
        <>
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="RQC Logos" />
          <meta property="og:description" content="Here you can download RQC logos in different graphical formats" />
        </>
        )
    }
  </Head>
);

LogosHead.propTypes = {
  fb_locale: PropTypes.string,
};

LogosHead.defaultProps = {
  fb_locale: 'ru_RU',
};

LogosHead.contextTypes = {
  t: PropTypes.func,
};

export default LogosHead;
