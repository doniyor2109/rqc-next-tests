import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Form = styled.form`
  position: relative;
  margin: 0 auto;
  width: auto;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Input = styled.input`
  width: 70%;
  @media (max-width: 768px) {
    width: 84%;
  }
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
`;

const SubmitButton = styled.button`
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
`;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { searchSubmit } = this.props;
    const { value } = this.state;
    searchSubmit(value);
  }

  render() {
    const { t } = this.context;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          placeholder={t('Ваш запрос')}
          onChange={this.handleChange}
        />
        <SubmitButton type="submit" />
      </Form>
    );
  }
}

SearchForm.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

SearchForm.contextTypes = {
  t: PropTypes.func,
};

export default SearchForm;
