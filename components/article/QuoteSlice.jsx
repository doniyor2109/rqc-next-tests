import React from 'react'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import styled from 'styled-components'

const StyledQuoteSlice = styled.div`
  .slice-type-quote {
    color: #040303;
    margin-top: 3rem;

    h3 {
      font-size: 2.2rem;
      line-height: 2.7rem;
    }

    .quote-body {
      display: flex;
      flex-direction: row;

      img {
        width: 6.3rem;
      }
      .open-quote {
        align-self: flex-start;
        margin: -2.5rem 3rem 0 0;
      }
      .close-quote {
        align-self: flex-end;
        margin: 0 0 -2.5rem 3rem;
      }
    }

    .quote-footer {
      text-align: right;
      width: 50%;
      margin: 2.5rem 10rem 2.5rem auto;

      h3,
      h4 {
        font-size: 1.4rem;
        line-height: 1.8rem;
      }

      h3 {
        font-weight: bold;
      }
    }
  }
  @media screen and (max-width: 415px) {
    .slice-type-quote {
      .quote-body {
        flex-direction: column;
        .open-quote {
          margin: 0 0 2rem 0;
        }
        .close-quote {
          margin: 2rem 0 0 0;
        }
      }
      .quote-footer {
        text-align: right;
        width: 100%;
        margin: 2rem 0 2rem auto;
      }
    }
  }
`

const QuoteSlice = ({ slice }) => (
  <StyledQuoteSlice>
    <div className="slice-type-quote columns">
      <div className="column is-8-desktop is-offset-2-desktop">
        <div className="quote-body">
          <img
            className="open-quote"
            src="../static/quote-mark-open.svg"
            alt="quotation mark"
          />
          {RichText.render(
            slice.primary.quote_text,
            PrismicConfig.linkResolver
          )}
          <img
            className="close-quote"
            src="../static/quote-mark-close.svg"
            alt="quotation mark"
          />
        </div>
        <div className="quote-footer">
          {RichText.render(
            slice.primary.quote_author,
            PrismicConfig.linkResolver
          )}
          {RichText.render(
            slice.primary.quote_author_position,
            PrismicConfig.linkResolver
          )}
        </div>
      </div>
    </div>
  </StyledQuoteSlice>
)

export default QuoteSlice
