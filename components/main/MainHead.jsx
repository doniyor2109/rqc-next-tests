import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hostName from '../../host';

const MainHead = ({ fb_locale }, { t }) => (
  <Head>
    <title>{t('Российский Квантовый Центр')}</title>
    <meta name="description" content={t('Добро пожаловать на официальный сайт Российского Квантового Центра!')} />
    <meta property="og:url" content={hostName} />
    <meta property="og:type" content="article" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta property="og:image" content={`${hostName}/static/RQClogo_black_ru.png`} />
    {(typeof fb_locale === 'undefined' || fb_locale === 'ru_RU')
        && (
          <Fragment>
            <meta property="og:locale" content="ru_RU" />
            <meta property="og:title" content="Российский Квантовый Центр" />
            <meta property="og:description" content="Добро пожаловать на официальный сайт Российского Квантового Центра!" />
          </Fragment>
        )
    }
    {fb_locale === 'en_US'
        && (
        <Fragment>
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="Russian Quantum Center – home page" />
          <meta property="og:description" content="Welcome to the official website of the Russian Quantum Center!" />
        </Fragment>
        )
    }
  </Head>
);

MainHead.contextTypes = {
  t: PropTypes.func,
};

export default MainHead;
