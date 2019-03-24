import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Form = styled.form`
  position: relative;
  margin: 0 auto;
  width: auto;

  #input-search {
      width: 70%;
      background: transparent;
      border: 0;
      border-bottom: 1px solid rgba(4,3,3,0.5);
      font-size: 1.4rem;
      font-style: italic;
      padding-bottom: 4px;
      margin-right: 1.5rem;
      &:focus {
          outline: 0;
      }
  }
  #input-submit-button {
      background: url('/static/search_button.svg');
      width: 2.5rem;
      height: 2.5rem;
      border: 0;
      top: 4px;
      position: relative;
      cursor: pointer;
      &:focus {
          outline: 0;
      }
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    #input-search {
        width: 84%;
    }
  }
`;

const SearchForm = ({ searchSubmit }, { t }) => (
  <Form onSubmit={searchSubmit}>
    <input
      type="text"
      id="input-search"
      name="search"
      placeholder={t('Ваш запрос')}
    />
    <button type="submit" id="input-submit-button" />
  </Form>
);

SearchForm.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

SearchForm.contextTypes = {
  t: PropTypes.func,
};

export default SearchForm;
