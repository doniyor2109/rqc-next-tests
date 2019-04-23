import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Popup from '../shared/Popup';
import Path from './structure3.svg';

const StyledPopup = styled.div`
    .modal-content {
        width: 100%;
        background: #F7F9FB;
        padding: 7rem 0;
    }
`;

const RQCStructurePopup = ({ active, close }) => (
  <StyledPopup>
    <Popup active={active} close={close}>
        <div className="container">
            <div className="columns">
                <div className="column is-12">
                    <Path />
                </div>
            </div>
        </div>
    </Popup>
  </StyledPopup>
);

RQCStructurePopup.propTypes = {

};

export default RQCStructurePopup;
