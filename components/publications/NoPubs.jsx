import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Message = styled.div`
  p {
    font-size: 1.4rem;
    line-height: 3rem;
    margin-bottom: 2rem;
  }
  font-size: 1.6rem;
  line-height: 2.3rem;
  button {
      color: #3998D1;
      font-weight: 500;
      text-decoration: underline;
      border: 0;
      font-size: inherit;
      line-height: inherit;
      cursor: pointer;
      &:focus {
        outline: 0;
      }
  }
`;

const NoPubs = ({ resetAll }, { t }) => (
  <div className="columns">
    <div className="column is-12-tablet is-8-desktop is-offset-2-desktop">
      <Message>
        <p>
          {t('По вашему запросу не найдено ни одной публикации')}
        </p>
        {t('Посмотрите список ')}
        <button onClick={e => resetAll(e)} type="button">
          {t('всех публикаций')}
        </button>
        {t(' или используйте фильтры для выбора публикаций определенного автора или научной группы')}
      </Message>
    </div>
  </div>
);

NoPubs.propTypes = {
  resetAll: PropTypes.func.isRequired,
};

NoPubs.contextTypes = {
  t: PropTypes.func,
};

export default NoPubs;
