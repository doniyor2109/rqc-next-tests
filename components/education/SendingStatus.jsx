import React from 'react';
import PropTypes from 'prop-types';
import H3 from '../shared/styled/H3';

const SendingStatus = ({ text }) => (
  <div style={{ textAlign: 'center' }}>
    <H3>
      {text}
    </H3>
  </div>
);

SendingStatus.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SendingStatus;
