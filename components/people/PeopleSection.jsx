import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import Person from './Person';
import RQCStructure from './RQCStructure';

const Section = styled.div`
  margin-top: 9rem;
  margin-bottom: 0;
  h2 {
    font-family: "DIN Pro", sans-serif;
    font-size: 1.8rem;
    text-transform: uppercase;
    color: #040303;
  }
  .section-subtitle {
    margin-top: 3rem;
  }

  @media (max-width: 415px) {
    .button-wrapper {
      text-align: center;
      width: 100%;
      margin-top: 4rem;
    }
  }
`;

export default class PeopleSection extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      primary: PropTypes.shape({
        team_section: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        hash: PropTypes.string,
      }),
    }),
    phone: PropTypes.string,
    tablet: PropTypes.string,
    structure: PropTypes.bool,
  }

  static defaultProps = {
    item: [],
    phone: null,
    tablet: null,
    structure: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      moreButtonIsActive: true,
      personasInMobile: 6,
    };
    this.moreClick = this.moreClick.bind(this);
  }

  moreClick(event) {
    const { item } = this.props;
    event.preventDefault();
    this.setState({
      personasInMobile: item.items.length,
      moreButtonIsActive: false,
    });
  }

  render() {
    const {
      item, phone, tablet, structure,
    } = this.props;
    // console.log({item})
    const { moreButtonIsActive, personasInMobile } = this.state;
    return (
      <Section id={item.primary.hash && item.primary.hash}>
        <div className="section-title">
          {RichText.render(item.primary.title, PrismicConfig.linkResolver)}
        </div>
        <div className="section-subtitle">
          {RichText.render(item.primary.subtitle, PrismicConfig.linkResolver)}
        </div>
        <div className="columns is-multiline is-mobile">
          <Media
            query="(min-width: 416px)"
            defaultMatches={phone === null}
            render={() => (
              <Fragment>
                {item.items.map(person => (
                  <Person
                    item={person}
                    key={person.person.data.name[0].text}
                  />
                ))}
              </Fragment>
            )}
          />
          <Media
            query="(max-width: 415px)"
            defaultMatches={phone !== null}
            render={() => (
              <Fragment>
                {item.items.slice(0, personasInMobile).map(person => (
                  <Person
                    item={person}
                    key={person.person.data.name[0].text}
                  />
                ))}
                {(item.items.length > 3)
                    && moreButtonIsActive
                    && (
                    <div
                      className="button-wrapper"
                      onClick={this.moreClick}
                      role="button"
                      tabIndex={-1}
                    >
                      <img
                        src="/static/more.svg"
                        alt="more"
                      />
                    </div>
                    )
                }
              </Fragment>
            )}
          />
          {structure && <RQCStructure phone={phone} tablet={tablet} />}
        </div>
      </Section>
    );
  }
}
