import React from 'react';
import PropTypes from 'prop-types';
import Partner from './Partner';
import StyledPartners from './styled/StyledPartners';
import H3 from '../shared/styled/H3';

const Partners = ({ page }) => (
  <StyledPartners id="partners">
    {page.data && (
    <div className="container">
      <H3>
        {page.data.body[0].primary.partners_section_name[0].text}
      </H3>
      <div className="partners-list">
        <div className="columns is-multiline is-mobile">
          {page.data.body[0].items.map(
            item => <Partner item={item} key={item.partners_name[0].text} />,
          )}
        </div>
      </div>
    </div>
    )
    }
  </StyledPartners>
);

Partners.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.shape({
      body: PropTypes.arrayOf(PropTypes.shape({
        primary: PropTypes.shape({
          partners_section_name: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
          })),
        }),
        items: PropTypes.arrayOf(PropTypes.shape()),
      })),
    }),
  }),
};

Partners.defaultProps = {
  page: {},
};

export default Partners;
