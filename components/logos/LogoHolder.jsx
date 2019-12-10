import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'prismic-reactjs';
import styled from 'styled-components';
import PrismicConfig from '../../prismic-configuration';

const Cell = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2.5rem;
    p {
        color: #3998D1;
        font-size: 1.6rem;
        line-height: 2.3rem;
    }

    img {
        margin-right: 2.2rem;
    }
`;

function getFilename(fileURL) {
    if (fileURL) {
        return fileURL.split(fileURL.lastIndexOf('/'));
    }
}


const LogoHolder = ({ logo }) => (
  <a href={`/api/download?filename=${Link.url(logo.url, PrismicConfig.linkResolver)}`} download>
    <Cell>
      <img src={logo.icon.url} alt="" />
      <p>{logo.name}</p>
    </Cell>
  </a>
);

export default LogoHolder;
