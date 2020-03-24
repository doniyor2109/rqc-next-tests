import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import MainCategory from '../shared/styled/MainCategory'
import Publication from '../publications/Publication'

const PubsPreview = ({ publications }, { t }) => (
  <section className="research-publications">
    <div className="container">
      <MainCategory>{t('Публикации')}</MainCategory>
      <div className="columns is-multiline">
        <div className="column is-12-tablet is-8-desktop is-offset-2-desktop ">
          {publications.pubs.map((pub, index) => (
            <Publication key={index} item={pub} />
          ))}
        </div>
      </div>
      <div className="columns is-multiline">
        <div className="column is-12 is-centered">
          <Link href="/publications">
            <div className="more-wrapper">
              <button className="more-text">{t('Все публикации')}</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </section>
)

PubsPreview.contextTypes = { t: PropTypes.func }

export default PubsPreview
