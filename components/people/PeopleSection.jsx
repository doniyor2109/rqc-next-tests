import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import Persona from './Persona';

const Section = styled.div`
  margin-bottom: 9rem;
  @media (max-width: 768px) {
      margin-bottom: 12rem;
  }
  @media (max-width: 415px) {
      margin-bottom: 9rem;
  }
  h2 {
    font-family: "DIN Pro", sans-serif;
    font-size: 1.8rem;
    margin-bottom: 6rem;
    text-transform: uppercase;
    color: #040303;
  }
  @media (max-width: 415px) {
    .button-wrapper {
      text-align: center;
      width: 100%;
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
  }

  static defaultProps = {
    item: [],
    phone: null,
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
    const { item, phone } = this.props;
    const { moreButtonIsActive, personasInMobile } = this.state;
    return (
      <Section id={item.primary.hash}>
        {RichText.render(item.primary.team_section, PrismicConfig.linkResolver)}
        <div className="columns is-multiline is-mobile">
          <Media
            query="(min-width: 416px)"
            defaultMatches={phone === null}
            render={() => (
              <Fragment>
                {item.items.map(persona => (
                  <Persona
                    item={persona}
                    key={persona.people_name[0] && persona.people_name[0].text}
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
                {item.items.slice(0, personasInMobile).map(persona => (
                  <Persona
                    item={persona}
                    key={persona.people_name[0] && persona.people_name[0].text}
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
        </div>
      </Section>
    );
  }
}
