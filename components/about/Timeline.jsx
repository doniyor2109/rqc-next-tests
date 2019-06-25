import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Milestone from './Milestone';
import MainCategory from '../shared/styled/MainCategory';

const Milestones = styled.div`
    background: #F7F9FB;
    padding: 3rem;
    clear:both;
`;

const Styled = styled.div`
    @media (max-width: 415px) {
        margin-top: 5rem;
    }
`;

const Timeline = ({ timeline }, { t }) => (
  <Styled>
    <MainCategory>
      {t('Таймлайн')}
    </MainCategory>
    <Milestones>
      {timeline.map(item => <Milestone milestone={item} key={item.milestone[0].text} />)}
    </Milestones>
  </Styled>
);

Timeline.contextTypes = {
  t: PropTypes.func,
};

Timeline.propTypes = {
  timeline: PropTypes.arrayOf(PropTypes.shape()),
};

Timeline.defaultProps = {
  timeline: [],
};

export default Timeline;
