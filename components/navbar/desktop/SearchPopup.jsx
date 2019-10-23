import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import Popup from '../../shared/Popup';

const Styled = styled.div`

    .modal {
        top: 11rem;
        height: 47rem;
        
        .modal-background {
            background-color: #F7F9FB;
            opacity: 0.95;
            height: 100%;
            width: 100%;
        }

        .modal-content {
            max-height: 100%;
            height: 100%;
            top: 6rem;
            width: 100%;

            .columns {
                width: 100%;
            }

            .search_form {
                position: relative;
                top: 4.3rem;
                margin: 0 auto;
                display: flex;
                width: 100%;

                #site-search {
                    flex-grow: 1;
                    background: transparent;
                    border: 0;
                    border-bottom: 1px solid rgba(4,3,3,0.5);
                    font-size: 1.4rem;
                    font-style: italic;
                    padding-bottom: 4px;
                    margin-right: 3rem;
                    &:focus {
                        outline: 0;
                    }
                }
                #submit-button {
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

            }
            .modal-close {
                top: 0;
                right: 19rem;
                &:hover {
                    background: transparent;
                }
            }
        }

    }
    .modal.is-active {
        display: block;
    }
`;


class SearchPopup extends React.Component {
    static contextTypes = {
      t: PropTypes.func,
    }

    static propTypes = {
      close: PropTypes.func.isRequired,
      active: PropTypes.bool,
    };

    static defaultProps = {
      active: false,
    };

    state = {
      value: '',
    }

    handleChange = (e) => {
      this.setState({
        value: e.target.value,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { value } = this.state;
      const { close } = this.props;
      if (value.length) {
        close();
        Router.push(`/search?text=${value}`, `/search/${value}`);
      }
    }

    render() {
      const { active, close } = this.props;
      const { t } = this.context;
      const { value } = this.state;
      return (
        <Styled>
          <Popup active={active} close={close}>
            <div className="container">
              <div className="columns">
                <div className="column is-3-desktop" />
                <div className="column is-6-desktop">
                  <form className="search_form" onSubmit={this.handleSubmit}>
                    <input
                      type="search"
                      id="site-search"
                      name="search"
                      placeholder={t('Напишите ваш запрос')}
                      value={value}
                      onChange={e => this.handleChange(e)}
                    />
                    <button type="submit" id="submit-button" />
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        </Styled>
      );
    }
}

export default SearchPopup;
