import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const AccordeonStyled = styled.div`

    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    margin-bottom: 1rem;

    .head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 1.8rem;
        font-weight: 500;
        color: #3998D1;
        text-transform: uppercase;
        background: white;
        padding: 2.3rem 3rem;
        cursor: pointer;
        &:focus {
            outline: 0;
        }
    }

    .collapse {
        height: ${props => (props.isOpened ? '100%' : '0%')};
        animation: open 1s;
    }

    @keyframes open {
        0% {height: 0px};
        10% {height: 10%};
        50% {height: 50%};
        100% {height: 100%};
    }
`;

export default class Accordeon extends Component {
    static propTypes = {
      title: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }

    static defaultProps = {
      title: [],
      content: [],
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
      const { title, content } = this.props;
      const { isOpened } = this.state;
      return (
        <AccordeonStyled isOpened={isOpened}>
          <div className="head" onClick={this.open} role="button" tabIndex="0">
            {title}
            {isOpened
              ? <img src="/static/arrow_up.svg" alt="" />
              : <img src="/static/arrow_down.svg" alt="" />
            }
          </div>
          <div className="collapse">
            {RichText.render(content, PrismicConfig.linkResolver)}
          </div>
        </AccordeonStyled>
      );
    }
}
