import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowButton from '../shared/ArrowButton';
import RQCStructurePopup from './RQCStructurePopup';

const StructureCard = styled.div`
    background: #3998D1;
    color: white;
    margin-top: 6rem;
    padding: 3.8rem 3rem 3rem 3rem;
    position: relative;
    height: 30rem;

    h3 {
        font-size: 2.2rem;
        line-height: 3rem;
        font-weight: bold;
        text-transform: uppercase;
    }
    p {
        font-size: 1.4rem;
        line-height: 1.8rem;
        margin-top: 2rem;
    }
`;

class RQCStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupIsActive: false,
    };
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  showPopup(e) {
    e.preventDefault();
    this.setState({
      popupIsActive: true,
    });
  }

  closePopup(e) {
    e.preventDefault();
    this.setState({
      popupIsActive: false,
    });
  }


  render() {
    const { t } = this.context;
    const { popupIsActive } = this.state;
    return (
      <div className="column is-3-desktop is-6-tablet is-12-mobile">
          <a onClick={e => this.showPopup(e)}>
        <StructureCard>
            <h3>
              {t('Структура Российского Квантового Центра')}
            </h3>
            <p>
              {t('Система управления и источники финансирования')}
            </p>
            <ArrowButton color="ffffff" onClick={this.showPopup} />
        </StructureCard>
          </a>
        <RQCStructurePopup close={this.closePopup} active={popupIsActive} />
      </div>
    );
  }
}

RQCStructure.propTypes = {

};

RQCStructure.contextTypes = {
  t: PropTypes.func,
};

export default RQCStructure;
