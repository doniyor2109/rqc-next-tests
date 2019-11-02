import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainCategory from '../shared/styled/MainCategory';
import MilestonesSlider from './MilestonesSlider';

const Styled = styled.section`
  background-color: #F7F9FB;
  padding: 7rem 0;
`;


const Milestones = ({ milestones, phone, tablet }, { t }) => (
  <Styled>
    <div className="container">
      <MainCategory>
        {t('Наши успехи')}
      </MainCategory>
      <MilestonesSlider slides={milestones} phone={phone} tablet={tablet} />
    </div>
  </Styled>
);

Milestones.propTypes = {
  milestones: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    milestone: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
  })),
  phone: PropTypes.string,
  tablet: PropTypes.string,
};

Milestones.defaultProps = {
  milestones: [],
  phone: null,
  tablet: null,
};

Milestones.contextTypes = {
  t: PropTypes.func,
};

export default Milestones;
