import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const JPG = ({ description, logos }) => {
  return (
    <div className="png-block">
      <div className="columns">
        <div className="column is-8-desktop is-12-tablet is-12-mobile">
          <div className="icon-text-wrap">
            <img src="/static/jpg_icon.svg" className="icon" alt="icon" />
            <span className="description">{description}</span>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-8-desktop is-12-tablet is-12-mobile">
          <div className="logo-table jpg">
            {logos.map(logo => {
              const fileName = logo.logo_jpg.url.slice(
                logo.logo_jpg.url.indexOf('_') + 1,
                logo.logo_jpg.url.indexOf('?')
              )
              return (
                <div className="cell jpg" key={fileName}>
                  <Link
                    href={`/logo/${fileName}?imageURL=${logo.logo_jpg.url}`}
                  >
                    <a>
                      <img
                        className="jpg"
                        src={logo.logo_jpg.thumbnail.url}
                        alt="rqc jpg logo"
                      />
                    </a>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

JPG.propTypes = {
  description: PropTypes.string,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      logo_jpg: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ),
}

export default JPG
