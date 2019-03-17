import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ searchSubmit, searchChange, pubsearch }, { t }) => (
  <form className="search_form" onSubmit={e => searchSubmit(e)}>
    <input
      type="search"
      id="input-search"
      name="search"
      value={pubsearch}
      onChange={e => searchChange(e)}
      placeholder={t('Ваш запрос')}
    />
    <button type="submit" id="input-submit-button" />
  </form>
);

SearchForm.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
  searchChange: PropTypes.func.isRequired,
  pubsearch: PropTypes.string,
};

SearchForm.defaultProps = {
  pubsearch: '',
};

SearchForm.contextTypes = {
  t: PropTypes.func,
};

export default SearchForm;
