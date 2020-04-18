import React from 'react'
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'

const StyledImage = styled.div`
  .article-image-wrapper {
    position: relative;
    display: inline-block;
    max-width: 100%;
    padding: 0;
  }

  figure {
    margin-bottom: 6rem;
    text-align: center;
  }

  figcaption {
    border-bottom: 1px solid rgba(4, 3, 3, 0.5);
    color: rgba(4, 3, 3, 0.7);
    padding: 2rem 0 1.5rem;
    text-align: left;

    h5 {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
`
const BigImageSlice = ({ slice }) => (
  <div className="slice-type-image columns">
    <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
      <StyledImage>
        <figure>
          <div className="article-image-wrapper">
            <img
              src={slice.primary.body_image.url}
              alt={
                slice.primary.body_image_description[0] &&
                slice.primary.body_image_description[0].text
              }
            />
            <figcaption>
              {RichText.render(
                slice.primary.body_image_description,
                PrismicConfig.linkResolver
              )}
            </figcaption>
          </div>
        </figure>
      </StyledImage>
    </div>
  </div>
)

export default BigImageSlice
