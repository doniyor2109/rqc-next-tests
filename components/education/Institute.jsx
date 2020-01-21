import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'

const Style = styled.div`
  padding-top: 9rem;
  margin-bottom: ${props => (props.last ? '9rem' : 0)};
  h2 {
    font-size: 2.2rem;
    color: #040303;
    line-height: 3rem;
    font-weight: bold;
  }
  .welcome {
    margin-top: 2rem;
    font-size: 1.6rem;
    line-height: 2.3rem;
    p:not(:last-child) {
      margin-bottom: 2.3rem;
    }
  }
`

const Institute = ({ heading, text, last, id }) => (
  <Style last={last} id={id}>
    <div className="columns is-multiline">
      <div className="column is-12">
        {RichText.render(heading, PrismicConfig.linkResolver)}
      </div>
      <div className="column is-9-desktop is-offset-1-desktop is-12-tablet is-12-mobile">
        <div className="welcome">
          {RichText.render(text, PrismicConfig.linkResolver)}
        </div>
      </div>
    </div>
  </Style>
)

Institute.propTypes = {
  heading: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    })
  ),
  text: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    })
  ),
  last: PropTypes.bool,
  id: PropTypes.string,
}

Institute.defaultProps = {
  heading: [],
  text: [],
  last: false,
  id: '',
}

export default Institute
