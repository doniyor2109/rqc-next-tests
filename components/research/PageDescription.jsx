import React from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import Loading from '../shared/loading'
import htmlSerializer from '../shared/htmlSerializer'
import PrismicConfig from '../../prismic-configuration'

const PageDescription = (
  { isFetchingResearch, isFetchingGroups, page },
  { t }
) => (
  <section className="research-page">
    <div className="container">
      <h1 className="page-main-heading">{t('Исследования')}</h1>
      {(isFetchingResearch || isFetchingGroups) && <Loading />}
      <div className="columns">
        <div className="column is-8-desktop">
          {page &&
            page.data &&
            RichText.render(
              page.data.description,
              PrismicConfig.linkResolver,
              htmlSerializer
            )}
        </div>
      </div>
    </div>
  </section>
)

PageDescription.contextTypes = { t: PropTypes.func }

export default PageDescription
