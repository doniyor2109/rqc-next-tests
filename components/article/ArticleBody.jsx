import React from 'react'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import styled from 'styled-components'

const StyledArticleBody = styled.div`
  position: relative;
  margin-top: 5rem;
  font-family: 'DIN Pro', sans-serif;
  padding-bottom: 3rem;

  h2 {
    font-size: 2.2rem;
    line-height: 3rem;
    margin-bottom: 2rem;
  }

  .column.hr {
    padding: 0;
  }

  hr {
    height: 1px;
    background-color: rgba(4, 3, 3, 0.5);
    margin-top: 5rem;
    margin-left: 3px;
  }
  @media screen and (max-width: 415px) {
    strong {
      margin-left: 0;
    }
  }
`

const ArticleBody = ({ lead, content }) => (
  <StyledArticleBody>
    <div className="container">
      <div className="columns">
        <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
          {RichText.render(lead, PrismicConfig.linkResolver)}
        </div>
      </div>
      {content}
      <div className="column hr is-8-desktop is-offset-2-desktop is-12-tablet">
        <hr />
      </div>
    </div>
  </StyledArticleBody>
)

export default ArticleBody
