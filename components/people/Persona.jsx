/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Fragment } from 'react';
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
    margin-bottom: 3rem;
    
    .portrait {
        cursor: pointer;
        position: relative;
        margin-bottom: 3rem;
        button {
          background: white;
          right: 0;
          bottom: 0;
        }
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
      <Fragment>
        <div className="column is-2-desktop is-3-tablet is-6-mobile">
          <PersonaStyled ref={this.personaRef}>
            <div className="portrait">
              <img
                src={item.portrait.url}
                alt={item.people_name}
                onClick={e => this.handleClick(e, this.personaRef.current.offsetTop)}
              />
              <ArrowButton
                color="040303"
                onClick={e => this.handleClick(e, this.personaRef.current.offsetTop)}
              />
            </div>
            <div className="name">
              {RichText.render(item.people_name, PrismicConfig.linkResolver)}
            </div>
            <div className="position">
              {RichText.render(item.position, PrismicConfig.linkResolver)}
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
        <div className="column is-1-desktop is-1-tablet is-hidden-mobile" />
      </Fragment>
    );
  }
}

export default Persona;
