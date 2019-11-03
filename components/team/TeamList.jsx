import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import H3 from '../shared/styled/H3';

const Styled = styled.div`
  margin-top: 5rem;

  h3 {
    margin-bottom: 2rem;
  }
  p {
    font-size:1.6rem;
    line-height: 2.3rem;
    font-weight: bold;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    margin-top: 6rem;
    button {
      background: transparent;
      border-bottom: 2px solid #3998D1;
      border-top: 2px solid #3998D1;
      border-left: 2px solid #3998D1;
      border-right: 0;
      padding: 0 2.7rem;
      font-size: 1.2rem;
      line-height: 3rem;
      color: #3998D1;
      text-transform: uppercase;
      font-weight: bold;
      font-family: "DIN Pro";
      cursor: pointer;
      white-space: nowrap;
      &:focus {
        outline: 0;
      }
      img {
        width:3.5rem;
        height:3.5rem;
        &:focus {
            outline: 0;
        }
        cursor: pointer;
      }
    }
  }
`;

const TeamList = ({ list, name }, { t }) => (
  <Styled>
    <H3>
      {t('Участники группы')}
    </H3>
    {(list.length > 0)
      && RichText.render(list, PrismicConfig.linkResolver)
    }
    <Link href={`/publications?group=${name}`}>
      <div className="wrapper">
        <button className="group-publications" type="button">
          {t('Публикации группы')}
        </button>
        <img src="/static/arrow-right-blue.svg" alt="" />
      </div>
    </Link>
  </Styled>
);

TeamList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  name: PropTypes.string,
};

TeamList.defaultProps = {
  list: [],
  name: '',
};

TeamList.contextTypes = {
  t: PropTypes.func,
};


export default TeamList;
