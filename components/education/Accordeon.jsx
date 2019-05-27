import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import {
  Title, TeamLead, HR,
} from './ProjectStyles';

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
        max-height: ${props => (props.isOpened ? '300rem' : '0')};
        overflow: hidden;
        height: auto;
        transition: max-height 1s ease-in;
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
        schedule: PropTypes.arrayOf(PropTypes.shape({
          url: PropTypes.string,
        })),
        file_download_heading: PropTypes.arrayOf(PropTypes.shape({
          url: PropTypes.string,
        })),
      })),
    }

    static defaultProps = {
      title: [],
      description: [],
      list: [],
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
      const { title, description, list } = this.props;
      const { isOpened } = this.state;
      const { t } = this.context;
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
              {(list.length > 0)
              && (
              <div className="columns" style={{ marginTop: '2rem' }}>
                <div className="column is-5">
                  <Title>
                    {t('Курсы')}
                  </Title>
                </div>
                <div className="column is-7">
                  <Title>
                    {t('Научные руководители')}
                  </Title>
                </div>
              </div>
              )
              }
              <div className="columns is-multiline">
                {list.map((element, index) => (
                  <Fragment key={element.course[0].text}>
                    <div className="column is-5">
                      <TeamLead>
                        <h1>
                          {element.course[0].text}
                        </h1>
                      </TeamLead>
                      <a href={element.schedule.url && element.schedule.url} target="_blank" rel="noopener noreferrer" className="cv">
                        {element.file_download_heading[0] && element.file_download_heading[0].text}
                      </a>
                    </div>

                    <div className="column is-7">
                      <div className="teamleads">
                        {RichText.render(element.teamleads, PrismicConfig.linkResolver)}
                      </div>
                    </div>
                    <div className="column is-12">
                      {(index < (list.length - 1)) && <HR />}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </AccordeonStyled>
      );
    }
}
