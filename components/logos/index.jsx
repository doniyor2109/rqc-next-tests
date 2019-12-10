import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageHeading from '../shared/PageHeading';
import PageDescription from '../shared/PageDescription';
import LogoHolder from './LogoHolder';

const Page = styled.section`
  padding: 10rem 0;
  .logos {
    margin-top: 8rem;
  }
`;


const index = ({ page }) => (
  <Page>
    <div className="container">
      <div className="columns">
        <div className="column is-8-desktop is-12-tablet is-12-mobile">
          <PageHeading title={page.data.title[0].text} />
          <PageDescription description={page.data.description} />
        </div>
      </div>
      <div className="columns logos">
        <div className="column is-4-desktop is-6-tablet is-12-mobile">
            {page.data.logos_ru.map((logo, index) => <LogoHolder logo={logo} key={logo.url.url} />)}
        </div>
        <div className="column is-4-desktop is-6-tablet is-12-mobile">
            {page.data.logos_en.map(logo => <LogoHolder logo={logo} key={logo.url.url} />)}
        </div>
      </div>
    </div>
  </Page>
);

index.propTypes = {

};

export default index;
