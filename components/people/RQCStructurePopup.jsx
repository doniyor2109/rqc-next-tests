import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import styled from 'styled-components';
import Popup from '../shared/Popup';
import StructureDesktopRU from './dRU.svg';
import StructureTabletRU from './tRU.svg';
import StructureMobileRU from './mRU.svg';
import StructureDesktopEN from './dEN.svg';
import StructureTabletEN from './tEN.svg';
import StructureMobileEN from './mEN.svg';

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
        svg {
          text {
            font-family: 'DIN Pro';
          }
        }
    }
`;
const RQCStructurePopup = ({
  active, close, phone, tablet, lang,
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
                lang === 'ru' ? <StructureDesktopRU /> : <StructureDesktopEN />
              )}
            />
            <Media
              query="(min-width: 416px) and (max-width: 768px)"
              defaultMatches={tablet !== null}
              render={() => (
                lang === 'ru' ? <StructureTabletRU /> : <StructureTabletEN />
              )}
            />
            <Media
              query="(max-width: 415px)"
              defaultMatches={phone !== null}
              render={() => (
                lang === 'ru' ? <StructureMobileRU /> : <StructureMobileEN />
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
  lang: PropTypes.string,
};
RQCStructurePopup.defaultProps = {
  phone: null,
  tablet: null,
  active: false,
  lang: 'ru',
};


export default RQCStructurePopup;
