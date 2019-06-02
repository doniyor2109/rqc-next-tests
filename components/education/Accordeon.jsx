import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import CourseDescription from './CourseDescription';

const AccordeonStyled = styled.div`

    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    margin-bottom: 1rem;
    background: white;

    .head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 1.8rem;
        font-weight: 500;
        color: #3998D1;
        text-transform: uppercase;
        padding: 2.3rem 3rem;
        cursor: pointer;
        &:focus {
            outline: 0;
        }
        overflow: hidden;
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

            .teamleads {
              h1, h2, h3, h4, h5, h6 {
                font-size: 2.2rem;
                line-height: 2.7rem;
                font-weight: normal;
              }
            }
        }
    }
`;

export default class Accordeon extends Component {
    static propTypes = {
      title: PropTypes.string,
      description: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      list: PropTypes.arrayOf(PropTypes.shape({
        course: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        teamleads: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        schedule: PropTypes.shape({
          url: PropTypes.string,
        }),
        file_download_heading: PropTypes.arrayOf(PropTypes.shape({
          url: PropTypes.string,
        })),
      })),
      phone: PropTypes.string,
    }

    static defaultProps = {
      title: [],
      description: [],
      list: [],
      phone: null,
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
        title, description, list, phone,
      } = this.props;
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
            <div className="content">
              {RichText.render(description, PrismicConfig.linkResolver)}
              <div className="columns is-multiline" style={{ marginTop: '2rem' }}>
                {list.map((item, index) => (
                  <CourseDescription
                    item={item}
                    first={index === 0}
                    last={index === (list.length - 1)}
                    phone={phone}
                    key={item.course[0].text}
                  />
                ))}
              </div>
            </div>
          </div>
        </AccordeonStyled>
      );
    }
}
