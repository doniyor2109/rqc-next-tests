import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import hostName from '../../host';

const EducationHead = ({ fbLocale }, { t }) => (
  <Head>
    <title>{t('Образование')}</title>
    <meta property="og:url" content={`${hostName}/education`} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://prismic-io.s3.amazonaws.com/rqc1%2F4f248627-8cde-4387-9071-bf3ebd23ae6e_1444993871.jpg" />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fbLocale === 'undefined' || fbLocale === 'ru_RU')
      && (
      <Fragment>
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content="Образование" />
        <meta property="og:description" content="Магистратура и аспирантура на базе РКЦ в сотрудничестве с ведущими вузами России" />
      </Fragment>
      )
  }
    {fbLocale === 'en_US'
      && (
      <Fragment>
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Education" />
        <meta property="og:description" content="Master's and PhD studies based on the RQC in cooperation with major universities" />
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
