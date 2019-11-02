import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Styled = styled.div`
    h1, h5 {
        font-size: 2rem;
        font-weight: bold;
        margin: 1rem 0;
    }

    h3 {
        font-size: 1.8rem;
        text-transform: uppercase;
        color: #040303;
    }

    p {
        font-size: 1.4rem;
        line-height: 1.8rem;
        margin-bottom: 1rem;
        max-width: 80%;

    }
    img {
        height: auto;
        max-width: 80%;
        margin-top: 1rem;
    }

    @media (max-width:415px) {
        h1, h5 {
            font-size: 1.4rem;
            text-transform: none;
            font-weight: bold;
            margin: 2.5rem 0 0 0;
        }
        li {
            font-size: 1.4rem;

        }
    }

`;

const Leader = ({ leaderdata, position }) => (
  <Styled>
    <h3>
      {RichText.render(position, PrismicConfig.linkResolver)}
    </h3>
    {leaderdata
        && (
        <>
          <img src={leaderdata.photo.url} alt={leaderdata.name} />
            {RichText.render(leaderdata.name, PrismicConfig.linkResolver)}
            {RichText.render(leaderdata.position, PrismicConfig.linkResolver)}
        </>
        )
    }
  </Styled>
);

Leader.propTypes = {
  leaderdata: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    position: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    photo: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  position: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
};

Leader.defaultProps = {
  leaderdata: {},
  position: [],
};

export default Leader;
