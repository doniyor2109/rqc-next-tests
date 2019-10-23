import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  order: 3;
  padding-left: 0;
  display: flex;
  margin-top: 4rem;
  flex-direction: row;
  justify-content: space-between;
  width: 10rem;
  margin-right: 1.5rem;
  
  a {
    img {
      height:2rem;
      width:2rem;
    }
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
  a:nth-child(2) {
    img {
      width:2.5rem;
    }
  }

`;

const Social = ({ withSlider }) => (
  <Styled className="social">
    <a
      href="https://www.facebook.com/ruquantumcenter/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={withSlider ? '/static/fb_white.svg' : '/static/fb_gray.svg'} alt="" />
    </a>
    <a
      href="https://vk.com/ruquantumcenter"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={withSlider ? '/static/vk_white.svg' : '/static/vk_gray.svg'} alt="" />
    </a>
    <a
      href="https://twitter.com/ruquantumcenter"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={withSlider ? '/static/twitter_white.svg' : '/static/twitter_gray.svg'} alt="" />
    </a>
  </Styled>
);

Social.propTypes = {
  withSlider: PropTypes.bool,
};

Social.defaultProps = {
  withSlider: false,
};

export default Social;
