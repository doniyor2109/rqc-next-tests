import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const PNG = ({ description, logos }) => (
  <div className="png-block">
    <div className="columns">
      <div className="column is-8-desktop is-12-tablet is-12-mobile">
        <div className="icon-text-wrap">
          <img src="/static/png_icon.svg" className="icon" alt="icon" />
          <span className="description">{description}</span>
        </div>
      </div>
    </div>
    <div className="columns">
      <div className="column is-8-desktop is-12-tablet is-12-mobile">
        <div className="logo-table">
          {logos.map(logo => (
            <div className="cell png" key={logo.logo_png.name}>
              <Link
                href={`/logo/${logo.logo_png.name}?imageURL=${logo.logo_png.url}`}
              >
                <a>
                  <img
                    className="png"
                    src={logo.logo_png.url}
                    alt="rqc png logo"
                  />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

PNG.propTypes = {
  description: PropTypes.string,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      logo_png: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ),
}

export default PNG
