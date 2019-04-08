import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LeadSection from './LeadSection';

const Section = styled.section`
    background-color: #F7F9FB;
    padding: 6rem 0;
    margin-top: 3rem;
`;

const Projects = ({ items, phone }) => (
  <Section>
    <div className="container">
      <div className="columns is-multiline">
        {items.map((item, index) => (
          <LeadSection
            item={item}
            key={item.name[0] && item.name[0].text}
            last={index === (items.length - 1)}
            first={index === 0}
            phone={phone}
          />
        ))}
      </div>
    </div>
  </Section>
);

Projects.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(LeadSection.projectType)),
  phone: PropTypes.bool,
};

Projects.defaultProps = {
  items: [],
  phone: false,
};

Projects.contextTypes = {
  t: PropTypes.func,
};

export default Projects;
