import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hostName from '../../host';

const PubHead = ({ fbLocale }, { t }) => (
  <Head>
    <title>{t('Публикации')}</title>
    <meta property="og:url" content={`${hostName}/publications}`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={`${hostName}/static/qaqam.jpg`} />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fbLocale === 'undefined' || fbLocale === 'ru_RU')
            && (
            <Fragment>
              <meta property="og:locale" content="ru_RU" />
              <meta property="og:title" content="Публикации" />
              <meta property="og:description" content="Публикации научных групп РКЦ за все время" />
            </Fragment>
            )
        }
    {fbLocale === 'en_US'
            && (
            <Fragment>
              <meta property="og:locale" content="en_US" />
              <meta property="og:title" content="Publications" />
              <meta property="og:description" content="RQC scientific publications" />
            </Fragment>
            )
        }
  </Head>
);

PubHead.contextTypes = {
  t: PropTypes.func,
};

PubHead.propTypes = {
  fbLocale: PropTypes.string,
};

PubHead.defaultProps = {
  fbLocale: 'undefined',
};
export default PubHead;
