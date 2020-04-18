import React from 'react'
import styled from 'styled-components'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'

const StyledHero = styled.div`
  color: #040303;
  position: relative;
  padding: 0;
  font-family: 'DIN Pro', sans-serif;
  margin-top: 10rem;

  h1 {
    font-size: 4.2rem;
    text-transform: uppercase;
    line-height: 5rem;
    margin-top: 3rem;
    font-weight: bold;
  }

  .article-date {
    margin: 2.5rem 0 5.5rem;
    font-size: 1.4rem;
  }

  .article-tags {
    p {
      display: inline;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      border: 1px solid #040303;
      padding: 0.4rem 0.8rem;
      margin-right: 1.6rem;
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      margin-top: 4rem;
    }
  }
  @media screen and (max-width: 415px) {
    h1 {
      margin-top: 4rem;
      font-size: 3rem;
      text-transform: uppercase;
      line-height: 4rem;
    }
  }
`

const ArticleHero = ({ cover, tags, date, title, phone, tablet }) => {
  let coverImage = null
  if (phone === null && tablet === null) {
    coverImage = cover.url
  } else if (phone !== null) {
    coverImage = cover.iphone.url
  } else {
    coverImage = cover.ipad.url
  }
  return (
    <StyledHero>
      <div className="container">
        <div className="columns">
          <div className="column is-8-desktop is-offset-2-desktop is-12-tablet">
            <div className="article-tags">
              {tags.map(item => (
                <p key={item}>{item}</p>
              ))}
            </div>
            {RichText.render(title, PrismicConfig.linkResolver)}
            <p className="article-date">{date}</p>
            <img src={coverImage} alt={title[0] && title[0].text} />
          </div>
        </div>
      </div>
    </StyledHero>
  )
}

export default ArticleHero
