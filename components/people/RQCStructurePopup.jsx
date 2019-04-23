import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import styled from 'styled-components';
import Popup from '../shared/Popup';
import StructureDesktop from './sDesktop.svg';
import StructureTablet from './sTablet.svg';
import StructureMobile from './sMobile22.svg';

const StyledPopup = styled.div`
    .modal-content {
        width: 100%;
        background: #F7F9FB;
        padding: 7rem 0;
        @media (max-width:415px) {
            padding: 6rem 0;
            height: 90%;
            max-height: 90%;
        }
    }
`;

const RQCStructurePopup = ({
  active, close, phone, tablet,
}) => (
  <StyledPopup>
    <Popup active={active} close={close}>
      <div className="container">
        <div className="columns">
          <div className="column is-12 is-centered">
            <Media
              query="(min-width: 769px)"
              defaultMatches={phone === null && tablet === null}
              render={() => (
                <StructureDesktop />
              )}
            />
            <Media
              query="(min-width: 416px) and (max-width: 768px)"
              defaultMatches={tablet !== null}
              render={() => (
                <StructureTablet />
              )}
            />
            <Media
              query="(max-width: 415px)"
              defaultMatches={phone !== null}
              render={() => (
                <StructureMobile />
              )}
            />
          </div>
        </div>
      </div>
    </Popup>
  </StyledPopup>
);

RQCStructurePopup.propTypes = {
  active: PropTypes.bool,
  close: PropTypes.func.isRequired,
  phone: PropTypes.string,
  tablet: PropTypes.string,
};
RQCStructurePopup.defaultProps = {
  phone: null,
  tablet: null,
  active: false,
};


export default RQCStructurePopup;
