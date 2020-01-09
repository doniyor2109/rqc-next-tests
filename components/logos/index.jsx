import React from 'react'
import PropTypes from 'prop-types'
import PageHeading from '../shared/PageHeading'
import EPS from './EPS'
import SVG from './SVG'
import PNG from './PNG'
import JPG from './JPG'
import Page from './styled'

const index = ({ page: { data } }) => (
  <Page>
    <div className="container">
      <div className="columns">
        <div className="column is-8-desktop is-12-tablet is-12-mobile">
          <PageHeading title={data.title[0].text} />
        </div>
      </div>
      <EPS
        description={data.eps_description[0].text}
        epsRU={data.eps_ru}
        epsEN={data.eps_en}
      />
      <SVG description={data.svg_description[0].text} logos={data.svg} />
      <PNG description={data.png_description[0].text} logos={data.png} />
      <JPG description={data.jpg_description[0].text} logos={data.jpg} />
      <hr className="logo-page-bottom" />
    </div>
  </Page>
)

index.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.shape({
      title: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      eps_description: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      eps_ru: PropTypes.shape({
        url: PropTypes.string,
      }),
      eps_en: PropTypes.shape({
        url: PropTypes.string,
      }),
      svg_description: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      svg: PropTypes.arrayOf(
        PropTypes.shape({
          logo_svg: PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
          }),
        })
      ),
      png_description: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      png: PropTypes.arrayOf(
        PropTypes.shape({
          logo_png: PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
          }),
        })
      ),
      jpg_description: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
      jpg: PropTypes.arrayOf(
        PropTypes.shape({
          logo_jpg: PropTypes.shape({
            url: PropTypes.string,
          }),
        })
      ),
    }),
  }),
}

export default index
