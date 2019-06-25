import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import hostName from '../../host';

const AboutHead = ({ fb_locale }, { t }) => (
  <Head>
    <title>{t('Что мы делаем')}</title>
    <meta name="description" content={t('Уникальный для России формат научного центра, занимающегося как фундаментальными исследованиями, так и разработкой устройств, основанных на квантовых эффектах. Занимает лидирующие позиции в научной области, а также в разработке высокотехнологичных коммерческих продуктов.')} />
    <meta property="og:url" content={`${hostName}/about`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={`${hostName}/static/wallpaper1.jpg`} />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fb_locale === 'undefined' || fb_locale === 'ru_RU')
        && (
        <>
          <meta property="og:locale" content="ru_RU" />
          <meta property="og:title" content="Что мы делаем" />
          <meta property="og:description" content="Уникальный для России формат научного центра, занимающегося как фундаментальными исследованиями, так и разработкой устройств, основанных на квантовых эффектах. Занимает лидирующие позиции в научной области, а также в разработке высокотехнологичных коммерческих продуктов." />
        </>
        )
        }
    {fb_locale === 'en_US'
        && (
        <>
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="What we do" />
          <meta property="og:description" content="Unique scientific center for Russia dealing with both fundamental research and the development of devices based on quantum effects. The RQC takes leading position in the scientific field, as well as in the development of high-tech commercial product." />
        </>
        )
    }
  </Head>
);

AboutHead.propTypes = {
  fb_locale: PropTypes.string,
};

AboutHead.defaultProps = {
  fb_locale: 'ru',
};

AboutHead.contextTypes = {
  t: PropTypes.func,
};

export default AboutHead;
