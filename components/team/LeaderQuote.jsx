import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Styled = styled.div`
  display: flex;
  margin: 4rem 0 0 0;

  .open-quote {
    align-self: flex-start;
    margin: 0 3rem 0 0;
  }
  .close-quote {
    align-self: flex-end;
    margin: 0 0 0 3rem;
  }
  .quote {
    font-size: 2.2rem;
    line-height: 2.7rem;
  }
  img {
    align-self: flex-start;
    margin-right: 4rem;
  }

  @media (max-width:415px) {
    flex-direction: column;
    .quote {
      margin-top: 1rem;
      p {
        font-size: 2.2rem;
        line-height: 2.7rem;
      }
    }
  }
`;

const LeaderQuote = ({ quote }) => (
  <Styled>
    <img className="open-quote" src="../static/quote-mark-open.svg" alt="quotation mark" />
    <div className="quote">
      {RichText.render(quote, PrismicConfig.linkResolver)}
    </div>
    <img className="close-quote" src="../static/quote-mark-close.svg" alt="quotation mark" />
  </Styled>
);

LeaderQuote.propTypes = {
  quote: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

LeaderQuote.defaultProps = {
  quote: [],
};

export default LeaderQuote;
