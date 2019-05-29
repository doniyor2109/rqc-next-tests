import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import Popup from '../shared/Popup';
import H3 from '../shared/styled/H3';

const Form = styled.div`
  .modal-content {
    width: 73rem;
    height: 95rem;
    @media (max-width: 415px) {
        width: 100%;
        display: block;
    }
    background: white;
    padding: 6rem 9.5rem;
    .select_wrapper {
      display: flex;
      align-items: center;
      margin-top: 6rem;
      @media (max-width: 768px) {
        align-items: flex-start;
        flex-direction: column;
      }           
      .name {
        font-size: 1.4rem;
        line-height: 3rem;
        font-weight: bold;
        margin-right: 1rem;
        @media (max-width:1088px) {
            width: 11rem;
        }
        @media (max-width: 768px) {
            font-size: 1.4rem;
            line-height: 3rem;
            font-weight: bold;
        }
        @media (max-width: 415px) {
            display: block;
            text-align: left;
        }
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
            vertical-align: top;
            padding-top: 3px; 
        }
      }
      .select-container {
        width: 50%;
      }
      .select__control {
        border-color: rgba(5, 4, 4, 0.5);
        border-radius: 0;
        height:3.5rem;
      }
      .select__placeholder {
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 2.4rem;
        font-style: italic;
        font-family: 'DIN Pro';
        padding: 0px 2px 1px;
      }
      .select__option, .select__single-value {
        font-weight: normal;
        font-size: 1.6rem;
        line-height: 2.4rem;
        font-style: normal;
        font-family: 'DIN Pro';
        padding: 0px 2px 1px;
        color:#040303;
      }
      .select__indicator-separator {
        display: none;
      }
      .group-select__dropdown-indicator {
        color:rgba(5, 4, 4, 0.5)
      }
    }
  }
`;

class FormPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStepen: '',
    };
    this.handleStepen = this.handleStepen.bind(this);
    this.stepenSelect = React.createRef();
  }

  handleStepen(stepen) {
    this.setState({
      selectedStepen: stepen.value,
    });
  }

  render() {
    const { close, active } = this.props;
    const { selectedStepen } = this.state;
    const { t } = this.context;
    const stepenOptions = [
      { value: t('Бакалавриат (открытие в 2020 г)'), label: t('Бакалавриат (открытие в 2020 г)') },
      { value: t('Магистратура'), label: t('Магистратура') },
      { value: t('Аспирантура (открытие в 2020 г)'), label: t('Аспирантура (открытие в 2020 г)') },
    ];
    return (
      <Form>
        <Popup close={close} active={active}>
          <H3>
            {t('Заявка на поступление')}
          </H3>
          <form>
            <div className="select_wrapper">
              <p className="name">
                {t('Степень обучения')}
                :
              </p>
              <Select
                onChange={this.handleStepen}
                options={stepenOptions}
                instanceId="select-stepen"
                className="select-container"
                classNamePrefix="select"
                placeholder={t('Выберите из списка...')}
                ref={this.stepenSelect}
                isOptionDisabled={option => option.value !== t('Магистратура')}
              />
            </div>
          </form>
        </Popup>
      </Form>
    );
  }
}

FormPopup.contextTypes = {
  t: PropTypes.func,
};

export default FormPopup;
