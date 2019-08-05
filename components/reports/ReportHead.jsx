import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hostName from '../../host';

const ReportHead = ({ fbLocale }, { t }) => (
  <Head>
    <title>{t('Отчеты РКЦ')}</title>
    <meta name="description" content={t('Отчеты о деятельности Российского Квантового Центра')} />
    <meta property="og:url" content={`${hostName}/reports`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={`${hostName}/static/oblozka.jpg`} />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fbLocale === 'undefined' || fbLocale === 'ru_RU')
        && (
        <Fragment>
          <meta property="og:locale" content="ru_RU" />
          <meta property="og:title" content="Отчеты РКЦ" />
          <meta property="og:description" content="Отчеты о деятельности Российского Квантового Центра" />
        </Fragment>
        )
    }
    {fbLocale === 'en_US'
        && (
        <Fragment>
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="Reports of the RQC" />
          <meta property="og:description" content="The RQC business reports" />
        </Fragment>
        )
    }
  </Head>
);

ReportHead.contextTypes = {
  t: PropTypes.func,
};

ReportHead.propTypes = {
  fbLocale: PropTypes.string,
};

ReportHead.defaultProps = {
  fbLocale: 'undefined',
};
export default ReportHead;
