/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';
import PrismicConfig from '../../prismic-configuration';
import {
  HR, Title, Button, Themes, TeamLead,
} from './styles/ProjectStyles';

class LeadSection extends React.Component {
    projectType = {
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
    };

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
      const {
        item, first, last, phone,
      } = this.props;
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
                    {item.group.data
                        && RichText.render(item.group.data.groupname, PrismicConfig.linkResolver)}
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
              {t('Темы')}
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
  item: PropTypes.shape(LeadSection.projectType),
  last: PropTypes.bool,
  first: PropTypes.bool,
  phone: PropTypes.bool,
};

LeadSection.defaultProps = {
  item: {},
  last: false,
  first: false,
  phone: false,
};

LeadSection.contextTypes = {
  t: PropTypes.func,
};

export default LeadSection;
