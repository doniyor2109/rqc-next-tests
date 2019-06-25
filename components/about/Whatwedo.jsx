/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Media from 'react-media';
import { RichText } from 'prismic-reactjs';

import Timeline from './Timeline';
import PageHeading from '../shared/PageHeading';
import H2 from '../shared/styled/H2';
import Paragraph from '../shared/styled/Paragraph';
import ButtonMore from '../shared/ButtonMore';
import PrismicConfig from '../../prismic-configuration';

const Section = styled.section`
  padding: 6rem 0 0 0;
`;

class Whatwedo extends React.Component {
    static propTypes = {
      phone: PropTypes.string,
      page: PropTypes.shape({
        title: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        description_title: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        description: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        goals_title: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        goals: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      }),
    }

    static defaultProps = {
      phone: null,
      page: {},
    }

    state = {
      moreInfo: true,
    }

    handleClick = () => {
      this.setState(prevState => ({
        moreInfo: !prevState.moreInfo,
      }));
    }

    render() {
      const { page, phone } = this.props;
      const { moreInfo } = this.state;

      return (
        <Section id="what-we-do">
          <div className="container">
            <div className="columns">
              <div className="column is-8-desktop is-6-tablet is-12-mobile">
                <PageHeading title={page.data.title[0].text} />
                <H2 style={{ padding: '6rem 0 2rem' }}>
                  {page.data.description_title[0].text}
                </H2>
                <Paragraph>
                  {RichText.render(page.data.description, PrismicConfig.linkResolver)}
                </Paragraph>
                <Media
                  query="(min-width: 416px)"
                  defaultMatches={phone === null}
                  render={() => (
                    <>
                      <H2 style={{ padding: '5rem 0 3rem' }}>
                        {page.data.goals_title[0].text}
                      </H2>
                      <Paragraph>
                        {RichText.render(page.data.goals, PrismicConfig.linkResolver)}
                      </Paragraph>
                    </>
                  )}
                />
                <Media
                  query="(max-width: 415px)"
                  defaultMatches={phone !== null}
                  render={() => (
                    <>
                      {!moreInfo
                        && (
                        <>
                          <H2 style={{ padding: '5rem 0 3rem' }}>
                            {page.data.goals_title[0].text}
                          </H2>
                          <Paragraph>
                            {RichText.render(page.data.goals, PrismicConfig.linkResolver)}
                          </Paragraph>
                        </>
                        )
                    }
                      {moreInfo && <ButtonMore onClick={this.handleClick} />}
                    </>
                  )}
                />
              </div>
              <div className="column is-4-desktop is-6-tablet is-12-mobile">
                <Timeline timeline={(page.data.timeline.length > 0) && page.data.timeline} />
              </div>
            </div>
          </div>
        </Section>
      );
    }
}

export default Whatwedo;
