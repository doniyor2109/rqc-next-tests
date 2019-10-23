import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 0 2rem 2rem;

    button {
        font-family: 'DIN Pro';
        font-size: 1.4rem;
    }
    p {
        padding-top: 4px;
    }
`;

const LangChoice = ({ currentLanguage, switchLanguage }) => {
  function switchtoEN() {
    switchLanguage('en-gb');
  }

  function switchtoRU() {
    switchLanguage('ru');
  }
  return (
    <Styled>
      <button
        onClick={switchtoRU}
        className={currentLanguage === 'ru' ? 'bold' : 'normal'}
        type="button"
      >
        RU
      </button>
      <p>&nbsp;&nbsp;/&nbsp;&nbsp;</p>
      <button
        onClick={switchtoEN}
        className={currentLanguage === 'en-gb' ? 'bold' : 'normal'}
        type="button"
      >
        EN
      </button>
    </Styled>
  );
};

LangChoice.propTypes = {
  currentLanguage: PropTypes.string,
  switchLanguage: PropTypes.func.isRequired,
};

LangChoice.defaultProps = {
  currentLanguage: 'ru',
};

export default LangChoice;
