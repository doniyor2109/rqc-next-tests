import React from 'react';
import styled from 'styled-components';

import PageHeading from '../shared/PageHeading';
import Accordeon from './Accordeon';


import StudyType from './StudyPropType';

const StyledPage = styled.div`
  color:#040303;
  padding: 10rem 0 0 0;

  .courses {
    background: #F7F9FB;
    padding: 3rem 0 12rem;
    margin-top: 4rem;
  }

  hr {
    height: 1px;
    background: rgba(4,3,3,0.5);
    margin: 4rem 0 0 0;
  }

`;

const TeamMainComponent = ({ items }) => (
  <StyledPage>
    <div className="container">
      <PageHeading title="Учебные материалы" />
    </div>
    <section className="courses">
      <div className="container">
        {items.map(item => (
          <div className="columns" key={item.data.name}>
            <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">
              <Accordeon
                title={item.data.name}
                author={item.data.author}
                description={item.data.description}
              />
            </div>
          </div>
        ))}
        <div className="columns">
          <div className="column is-12-desktop">
            <hr />
          </div>
        </div>
      </div>

    </section>
  </StyledPage>
);

TeamMainComponent.propTypes = {
  items: StudyType.items,
};

TeamMainComponent.defaultProps = {
  items: [],
};

export default TeamMainComponent;
