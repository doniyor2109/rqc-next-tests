import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hostName from '../../host';

const EducationHead = ({ fbLocale }, { t }) => (
  <Head>
    <title>{t('Новости')}</title>
    <meta property="og:url" content={`${hostName}/news`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={`${hostName}/static/qaqam.jpg`} />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fbLocale === 'undefined' || fbLocale === 'ru_RU')
      && (
      <Fragment>
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content="Новости" />
        <meta property="og:description" content="Новости РКЦ, а также квантовые технологии со всего мира" />
      </Fragment>
      )
  }
    {fbLocale === 'en_US'
      && (
      <Fragment>
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="News" />
        <meta property="og:description" content="The RQC news, as well as quantum technologies from around the world" />
      </Fragment>
      )
  }
  </Head>
);

EducationHead.contextTypes = {
  t: PropTypes.func,
};

EducationHead.propTypes = {
  fbLocale: PropTypes.string,
};

EducationHead.defaultProps = {
  fbLocale: 'undefined',
};
export default EducationHead;
