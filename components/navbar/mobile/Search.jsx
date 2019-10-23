import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';

const Styled = styled.div`
    width: 100%;
    padding: 0 1.5rem;

    .search_form {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      input {
        font-size: 1.6rem;
        font-style: italic;
        color: #555555;
        padding: 0 0 1rem 1rem;
        border: 0;
        flex-grow: 1;
        &:focus {
          outline: 0;
        }
      }
      #mobile-search-submit-button {
        background: url('/static/search_button.svg');
        width: 2rem;
        height: 2rem;
        border: 0;
        top: 4px;
        position: relative;
        cursor: pointer;
        right: 4px;
        background-size: cover;
        &:focus {
            outline: 0;
        }
      }
    }
`;

const Search = ({ close }, { t }) => {
  const [searchtext, setText] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    close();
    Router.push(`/search?text=${searchtext}`, `/search/${searchtext}`);
  }

  function onChange(event) {
    setText(event.target.value);
  }

  return (
    <Styled>
      <form className="search_form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('Напишите ваш запрос')}
          value={searchtext}
          onChange={onChange}
        />
        <button type="submit" id="mobile-search-submit-button" />
      </form>
    </Styled>
  );
};

Search.contextTypes = {
  t: PropTypes.func,
};

Search.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Search;
