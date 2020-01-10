import React from 'react'
import PropTypes from 'prop-types'

const EPS = ({ description, epsRU, epsEN }, { t }) => (
  <div className="eps-block">
    <div className="columns">
      <div className="column is-8-desktop is-12-tablet is-12-mobile">
        <div className="icon-text-wrap">
          <img src="/static/eps_icon.svg" className="icon" alt="icon" />
          <span className="description">{description}</span>
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-4-desktop is-6-tablet is-12-mobile">
        <div className="icon-text-wrap">
          <img src="/static/eps_icon.svg" className="icon" alt="icon" />
          <a href={epsRU.url}>{t('Русская версия')}</a>
        </div>
      </div>
      <div className="column is-4-desktop is-6-tablet is-12-mobile">
        <div className="icon-text-wrap">
          <img src="/static/eps_icon.svg" className="icon" alt="icon" />
          <a href={epsEN.url}>{t('Английская версия')}</a>
        </div>
      </div>
    </div>
  </div>
)

EPS.propTypes = {
  description: PropTypes.string,
  epsRU: PropTypes.shape({
    url: PropTypes.string,
  }),
  epsEN: PropTypes.shape({
    url: PropTypes.string,
  }),
}

EPS.contextTypes = {
  t: PropTypes.func,
}

export default EPS
