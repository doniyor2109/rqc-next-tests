import React, { Fragment } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import hostName from '../../host'

const ResearchHead = ({ fb_locale }, { t }) => (
  <Head>
    <title>{t('Научные группы РКЦ')}</title>
    <meta
      name="description"
      content={t(
        'Уникальный для России формат научного центра, занимающегося как фундаментальными исследованиями, так и разработкой устройств, основанных на квантовых эффектах. Занимает лидирующие позиции в научной области, а также в разработке высокотехнологичных коммерческих продуктов.'
      )}
    />
    <meta property="og:url" content={`${hostName}/research`} />
    <meta property="og:type" content="article" />
    <meta
      property="og:image"
      content={`${hostName}/static/research_wall.jpg`}
    />
    <meta property="og:locale:alternate" content="en_US" />
    {(typeof fb_locale === 'undefined' || fb_locale === 'ru_RU') && (
      <Fragment>
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content="Научные группы РКЦ" />
        <meta
          property="og:description"
          content="Уникальный для России формат научного центра, занимающегося как фундаментальными исследованиями, так и разработкой устройств, основанных на квантовых эффектах. Занимает лидирующие позиции в научной области, а также в разработке высокотехнологичных коммерческих продуктов."
        />
      </Fragment>
    )}
    {fb_locale === 'en_US' && (
      <Fragment>
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="RQC Science groups" />
        <meta
          property="og:description"
          content="Unique scientific center for Russia dealing with both fundamental research and the development of devices based on quantum effects. The RQC takes leading position in the scientific field, as well as in the development of high-tech commercial product."
        />
      </Fragment>
    )}
  </Head>
)

ResearchHead.contextTypes = {
  t: PropTypes.func,
}

export default ResearchHead
