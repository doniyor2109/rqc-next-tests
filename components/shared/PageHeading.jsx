import React from 'react';
import PropTypes from 'prop-types';
import H1 from './styled/H1';

const PageHeading = ({ title }, { t }) => (
  <H1>
    {t(title)}
  </H1>
);

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

PageHeading.contextTypes = {
  t: PropTypes.func,
};

export default PageHeading;
