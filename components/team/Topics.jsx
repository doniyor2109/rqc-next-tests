import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainCategory from '../shared/styled/MainCategory';
import TopicsSlider from './TopicsSlider';

const Styled = styled.section`
  padding: 7rem 0;
  margin-top: 7rem;    
  background-color: #F7F9FB;
`;


const Topics = ({ topics, phone, tablet }, { t }) => (
  <Styled>
    <div className="container">
      <MainCategory>
        {t('Направления исследований')}
      </MainCategory>
      <TopicsSlider slides={topics} phone={phone} tablet={tablet} />
    </div>
  </Styled>
);

Topics.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    research_topic: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    topics_list: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
  })),
  phone: PropTypes.string,
  tablet: PropTypes.string,
};

Topics.defaultProps = {
  topics: [],
  phone: null,
  tablet: null,
};

Topics.contextTypes = {
  t: PropTypes.func,
};

export default Topics;
