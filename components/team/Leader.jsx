import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import LeaderPopup from './LeaderPopup';

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
    .leader-photo {
        margin-top: 2rem;
        position: relative;
        cursor: pointer;
        &:focus {
            outline: none;
        }
        @media (max-width: 415px) {
            width: 55%;
        }
        .leader-img {
            height: auto;
            width: 100%;
        }
        .popup-opener {
            position: absolute;
            width: 3.5rem;
            height: 3.5rem;
            right: 3rem;
            bottom: 3rem;
        }
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

const Leader = ({ leaderdata, position }) => {
  const [popupIsActive, openPopup] = useState(false);

  return (
    <Styled>
      <h3>
        {position[0].text}
      </h3>
      <div className="leader-photo" onClick={() => openPopup(true)} role="button" tabIndex={0}>
        <img src={leaderdata.photo.url} alt={leaderdata.name} className="leader-img" />
        <img src="/static/leader_more_button.svg" className="popup-opener" alt="open popup with info about leader of the science group" />
      </div>
      {RichText.render(leaderdata.name, PrismicConfig.linkResolver)}
      {RichText.render(leaderdata.position, PrismicConfig.linkResolver)}
      {popupIsActive
        && (
        <LeaderPopup
          close={() => openPopup(false)}
          active={popupIsActive}
          item={leaderdata}
        />
        )
        }
    </Styled>
  );
};

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
