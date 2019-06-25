import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-left: 2px solid #3998D1;
    padding:3rem 0;
    font-size:1.4rem;
    line-height: 1.8rem;

    p {
        font-size:1.4rem;
        line-height: 1.8rem;
    }

    .year_wrapper {
        margin: -3px 0 0 2rem;
        div {
            margin-top: 1.2rem;
        }
    }
`;

const Milestone = ({ milestone }) => (
  <Styled>
    <img src="/static/about_milestone_dot.svg" alt="" />
    <div className="year_wrapper">
      <b>{milestone.year}</b>
      {RichText.render(milestone.milestone, PrismicConfig.linkResolver)}
    </div>
  </Styled>
);

Milestone.propTypes = {
  milestone: PropTypes.shape({
    year: PropTypes.string,
    milestone: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
  }),
};

Milestone.defaultProps = {
  milestone: {},
};

export default Milestone;
