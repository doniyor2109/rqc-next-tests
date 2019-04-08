import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';
import PrismicConfig from '../../prismic-configuration';

const Title = styled.p`
    font-size: 1.6rem;
    line-height: 2.3rem;
    font-weight: bold;
    color: rgba(4,3,3,0.7);
    margin-bottom:3rem;
`;


const TeamLead = styled.div`
    font-size: 1.6rem;
    line-height: 2.3rem;

    h1 {
        font-size: 2.2rem;
        line-height: 2.7rem;
        font-weight: bold;
    }
    .group {
        color: rgba(4,3,3,0.7);
        margin-top: 2rem;
        display: block;
        font-weight: bold;

        a {
            color: #3998D1;
            display: block;
            font-weight: bold;
            h1 {
                font-size: 1.6rem;
                line-height: 2.3rem;
            }            
        }

    }
    .email {
        color: rgba(4,3,3,0.7);
        margin-top: 2rem;
        font-weight: bold;
        a {
            color: #3998D1;
        }
    }
    .cv {
        display: block;
        margin-top: 2rem;
        color: #3998D1;
        font-weight: bold;
    }
`;

const Themes = styled.div`

    ul {
        list-style: disc;
        margin-left: 2rem;
        li {
            font-size: 2.2rem;
            line-height: 2.7rem;
            margin-bottom: 2.7rem;
            :nth-last-of-type(1) {
                margin-bottom:0;
            }
        }
    }
`;

const Button = styled.button`
    background: transparent;
    border: 0;
    padding: 0;
    text-align: center;
    width: 100%;
    margin-top: 4rem;
    :focus {
        outline: 0;
    }
    @media (max-width:415px) {
        margin-left: -1rem;
    }
`;

const HR = styled.hr`
    background: rgba(4,3,3,0.5);
    height: 1px;
`;


class LeadSection extends React.Component {
    projectType = PropTypes.shape({
      name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      projects: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      group: PropTypes.shape({
        uid: PropTypes.string,
      }),
      email: PropTypes.string,
      cv: PropTypes.shape({
        url: PropTypes.string,
      }),
    });

    constructor(props) {
      super(props);
      this.state = {
        themesNumber: 3,
        buttonPresent: true,
      };
      this.handleMore = this.handleMore.bind(this);
    }

    handleMore(event) {
      event.preventDefault();
      const { item } = this.props;
      this.setState({
        themesNumber: item.projects.length,
        buttonPresent: false,
      });
    }

    render() {
      const { item, first, last, phone } = this.props;
      const { t } = this.context;
      const { themesNumber, buttonPresent } = this.state;
      return (
        <Fragment>
          <div className="column is-4-desktop is-6-tablet is-12-mobile">
            {(first || phone)
            && (
            <Title>
              {t('Научный руководитель')}
            </Title>
            )
            }
            <TeamLead>
              <h1>
                {RichText.render(item.name, PrismicConfig.linkResolver)}
              </h1>
              <div className="group">
                {t('Группа')}
                :
                <Link href={`/team/${item.group.uid}`}>
                  <a>
                    {item.group.data && RichText.render(item.group.data.groupname, PrismicConfig.linkResolver)}
                  </a>
                </Link>
              </div>
              <div className="email">
                {'Email: '}
                <a href={`mailto:${item.email}`}>
                  {item.email}
                </a>
              </div>
              <a href={item.cv.url} target="_blank" rel="noopener noreferrer" className="cv">
                {t('Резюме')}
              </a>
            </TeamLead>
          </div>
          <div className="column is-7-desktop is-6-tablet is-12-mobile">
            {(first || phone)
            && (
            <Title>
              {t('Темы дипломного проекта')}
            </Title>
            )
            }
            <Themes>
              <ul>
                {item.projects.slice(0, themesNumber).map(project => (
                  <li key={project.text}>
                    {project.text}
                  </li>
                ))
                }
                {item.projects.length > 3
                    && buttonPresent
                    && (
                    <Button onClick={this.handleMore} type="button">
                      <img src="/static/more.svg" alt="more" />
                    </Button>
                    )
                }
              </ul>
            </Themes>
          </div>
          <div className="column is-11-desktop is-12-tablet is-12-mobile">
            {!last && <HR />}
          </div>
        </Fragment>
      );
    }
}

LeadSection.propTypes = {
  item: LeadSection.projectType,
  last: PropTypes.bool,
};

LeadSection.defaultProps = {
  item: {},
  last: false,
};

LeadSection.contextTypes = {
  t: PropTypes.func,
};

export default LeadSection;
