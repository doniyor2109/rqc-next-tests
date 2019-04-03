/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';
import PersonaPopup from './PersonaPopup';

const PersonaStyled = styled.div`
    font-family: "DIN Pro", sans-serif;
    color: #040303;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height:100%;

    .portrait {
        width: 19.5rem;
        margin-bottom: 4.7rem;
        cursor: pointer;
    }
    .name {
        h3 {
        font-family: "DIN Pro", sans-serif;
        font-size: 2.2rem;
        font-weight: bold;
        margin-bottom: 3rem;
        }
    }
    .position {
        flex-grow:1;
        p {
            font-size: 1.4rem;
            font-weight: bold;
            padding-bottom: 1.5rem;
            margin-bottom: 1.8rem;
        }
    }
    .titles {
      p {
        font-size: 1.4rem;
        font-weight: normal;
        line-height: 1.8rem;
        margin-bottom: 1.8rem;
        overflow-wrap: break-word;
      }
    }
    .button_wrap {
        position: relative;
        button {
            height: 3.5rem;
            width: 3.5rem;
            position: relative;
            right: auto;
            bottom: auto;
            overflow: hidden;
            margin-bottom: 6rem;
        }
    }
`;

class Persona extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      people_name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      position: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      portrait: PropTypes.PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    item: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      popupIsActive: false,
      cardoffsetTop: 0,
    };
    this.personaRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
  }

  handleClick(e, offset) {
    e.preventDefault();
    this.setState({
      popupIsActive: true,
      cardoffsetTop: offset,
    });
    document.body.classList.add('noscroll');
  }

  close() {
    const { cardoffsetTop } = this.state;
    this.setState({
      popupIsActive: false,
    });
    document.body.classList.remove('noscroll');
    window.scrollTo({
      top: cardoffsetTop,
    });
  }


  render() {
    const { item } = this.props;
    const { popupIsActive } = this.state;

    return (
      <div className="column is-3-desktop is-4-tablet">
        <PersonaStyled ref={this.personaRef}>
          <img
            className="portrait"
            src={item.portrait.url}
            alt={item.people_name}
            onClick={e => this.handleClick(e, this.personaRef.current.offsetTop)}
          />
          <div className="name">
            {RichText.render(item.people_name, PrismicConfig.linkResolver)}
          </div>
          <div className="position">
            {RichText.render(item.position, PrismicConfig.linkResolver)}
          </div>
          <div className="button_wrap">
            <ArrowButton
              color="040303"
              onClick={e => this.handleClick(e, this.personaRef.current.offsetTop)}
            />
          </div>
          {popupIsActive
            && (
            <PersonaPopup
              active={popupIsActive}
              close={this.close}
              item={item}
            />
            )
          }
        </PersonaStyled>
      </div>
    );
  }
}

export default Persona;
