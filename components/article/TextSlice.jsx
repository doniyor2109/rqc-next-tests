import React from 'react'
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'

const StyledTextSlice = styled.div`
  p {
    font-size: 1.6rem;
    margin-bottom: 2.3rem;
    line-height: 2.3rem;
  }
  h6 {
    margin-left: -6.4rem;
    width: 120%;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 3rem;
    line-height: 1.2;
  }
`

const TextSlice = ({ slice }) => (
  <div className="slice-type-text columns">
    <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
      <StyledTextSlice>
        {RichText.render(slice.primary.news_body, PrismicConfig.linkResolver)}
      </StyledTextSlice>
    </div>
  </div>
)

export default TextSlice
