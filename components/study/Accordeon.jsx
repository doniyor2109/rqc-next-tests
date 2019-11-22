import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import htmlSerializer from './htmlSerializer';

const AccordeonStyled = styled.div`

  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  margin-bottom: 1rem;
  background: white;

  .head {
    display: flex;
    flex-direction: column;
    padding: 3rem 3rem 1.5rem;
    cursor: pointer;
    position: relative;
    &:focus {
        outline: 0;
    }
    .names_wrap {
      width: 90%;
      @media (max-width: 415px) {
        width: 83%;
      }
    }

    .name, .name * {
      font-size: 1.8rem;
      font-weight: 500;
      color: #3998D1;
      text-transform: uppercase;
    }

    .author {
      font-style: normal;
      font-weight: normal;
      font-size: 1.6rem;
      line-height: 2rem;
      color: #040403;
    }

    img {
      position: absolute;
      right: 3rem;
      top: 2.3rem;
      @media (max-width: 768px) {
        right: 2.3rem;
      }
    }
  }

  .collapse {
    max-height: ${props => (props.isOpened ? '100%' : '0')};
    overflow: hidden;
    height: auto;
    .content {
      padding: 2rem 3rem 5rem;
      font-size: 1.6rem;
      line-height: 2.3rem;
      color: #040303;
      li {
        margin-top: 1.7rem;
      }
    }
  }

  a {
    color: #3998D1;
    font-weight: 500;
  }
`;

export default class Accordeon extends Component {
    static propTypes = {
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      author: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      description: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }

    static defaultProps = {
      title: [],
      description: [],
      author: [],
    }

    static contextTypes = {
      t: PropTypes.func,
    }

    constructor(props) {
      super(props);
      this.state = {
        isOpened: false,
      };
      this.open = this.open.bind(this);
    }

    open() {
      const { isOpened } = this.state;
      this.setState({
        isOpened: !isOpened,
      });
    }

    render() {
      const {
        title, description, author,
      } = this.props;
      const { isOpened } = this.state;
      return (
        <AccordeonStyled isOpened={isOpened}>
          <div className="head" onClick={this.open} role="button" tabIndex="0">
            <div className="names_wrap">
              <div className="name">
                {RichText.render(title, PrismicConfig.linkResolver)}
              </div>
              <div className="author">
                {RichText.render(author, PrismicConfig.linkResolver)}
              </div>
            </div>
            {isOpened
              ? <img src="/static/arrow_up.svg" alt="" />
              : <img src="/static/arrow_down.svg" alt="" />
            }
          </div>
          <div className="collapse">
            <div className="content">
              {RichText.render(description, PrismicConfig.linkResolver, htmlSerializer)}
            </div>
          </div>
        </AccordeonStyled>
      );
    }
}
