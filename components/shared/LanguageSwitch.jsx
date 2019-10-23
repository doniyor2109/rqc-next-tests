import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Styled = styled.div`
  order: 4;
  button {
    font-weight: 500;
    font-size: 1.2rem;
    font-family: "DIN Pro", sans-serif;
    opacity: 0.7;
    background: transparent;
    border: none;
    cursor: pointer;
    &:focus {
      outline: 0;
    }
    color: ${props => (props.withSlider ? 'white' : 'black')};
    svg {
      margin-left:0.5rem;
      top: 0.2rem;
      width: 1rem;
      position: relative;
    }
  }

  .lang-choice {
    margin-top: 4rem;
  }
  .selector {
    display: flex;
    flex-direction: column;
    top: ${props => (props.withSlider ? '7px' : '7rem')};
    right: ${props => (props.withSlider ? '6px' : '21px')};
    position: ${props => (props.withSlider ? 'relative' : 'absolute')};

    button {
      padding: 0.5rem 0;
      font-weight: 400;
      &:hover {
        font-weight: 500;
      }
    }
  }
`;

const LanguageSwitch = ({ withSlider, currentLanguage, switchLanguage }) => {
  const [langChoiceActive, showLangChoice] = useState(false);
  function show() {
    showLangChoice(!langChoiceActive);
  }

  function switchtoEN() {
    switchLanguage('en-gb');
    showLangChoice(false);
  }

  function switchtoRU() {
    switchLanguage('ru');
    showLangChoice(false);
  }


  return (
    <Styled withSlider={withSlider}>
      <button type="button" className="lang-choice" onClick={show}>
        {currentLanguage === 'ru' ? 'RU' : 'EN'}
        <FontAwesomeIcon icon="chevron-down" />
      </button>

      {langChoiceActive
        && (
        <div className="selector">
          <button
            type="button"
            onClick={switchtoEN}
          >
            EN
          </button>
          <button
            type="button"
            onClick={switchtoRU}
          >
            RU
          </button>
        </div>
        )
      }
    </Styled>
  );
};

LanguageSwitch.propTypes = {
  currentLanguage: PropTypes.string,
  withSlider: PropTypes.bool,
  switchLanguage: PropTypes.func.isRequired,
};

LanguageSwitch.defaultProps = {
  currentLanguage: 'ru',
  withSlider: false,
};

export default LanguageSwitch;
