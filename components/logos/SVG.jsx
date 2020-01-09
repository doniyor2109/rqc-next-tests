import React from 'react'
import PropTypes from 'prop-types'

const SVG = ({ description, logos }) => {
  return (
    <div className="svg-block">
      <div className="columns">
        <div className="column is-8-desktop is-12-tablet is-12-mobile">
          <div className="icon-text-wrap">
            <img src="/static/svg_icon.svg" className="icon" alt="icon" />
            <span className="description">{description}</span>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-8-desktop is-12-tablet is-12-mobile">
          <div className="logo-table">
            {logos.map(logo => (
              <div className="cell" key={logo.logo_svg.name}>
                <a
                  href={`/api/download?filename=${logo.logo_svg.name}&&filepath=${logo.logo_svg.url}`}
                  download
                >
                  <img src={logo.logo_svg.url} alt="rqc svg logo" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

SVG.propTypes = {
  description: PropTypes.string,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      logo_svg: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    })
  ),
}

export default SVG
