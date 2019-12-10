/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import hostName from '../../host';


const MediaKitHead = ({ fb_locale }, { t }) => (
  <Head>
    <title>{t('Медиа-кит')}</title>
    <meta name="description" content={t('Фото-, видеоматериалы, презентации РКЦ')} />
    <meta property="og:url" content={`${hostName}/mediakit`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={`${hostName}/static/mediakit.jpg`} />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fb_locale === 'undefined' || fb_locale === 'ru_RU')
        && (
        <>
          <meta property="og:locale" content="ru_RU" />
          <meta property="og:title" content="Медиа-кит" />
          <meta property="og:description" content="Фото-, видеоматериалы, презентации РКЦ" />
        </>
        )
    }
    {fb_locale === 'en_US'
        && (
        <>
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="Media kit" />
          <meta property="og:description" content="Photos, video, and presentations of RQC" />
        </>
        )
    }
  </Head>
);

MediaKitHead.propTypes = {
  fb_locale: PropTypes.string,
};

MediaKitHead.defaultProps = {
  fb_locale: 'ru_RU',
};

MediaKitHead.contextTypes = {
  t: PropTypes.func,
};

export default MediaKitHead;
