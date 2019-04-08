import React from 'react';
import { RichText } from 'prismic-reactjs';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';
import Popup from '../shared/Popup';

const PersPopup = styled.div`
    .modal-content {
      width: 92rem;
      padding: 5rem 0;
      background: white;
      @media (max-width: 768px) {
        width: 100%;
        padding: 5rem 3rem;
        margin: 0px 4rem;
        overflow-y: scroll; /* has to be scroll, not auto */
        -webkit-overflow-scrolling: touch;
      }
      @media (max-width: 415px) {
        margin: 3rem 0;
        max-height: calc(100vh - 3rem);
      }
    }
    .position p {
      border-bottom: 0;
    }
    .awards {
      p  {
        font-size: 1.4rem;
        font-weight: normal;
        line-height: 1.8rem;
        margin-bottom: 1.8rem;
        overflow-wrap: break-word;
      }
    }
    .portrait_wraper {
      text-align: center;
      @media (max-width: 768px) {
        .portrait {
          width: 25.5rem;
        }
      }
      @media (max-width: 415px) {
        .portrait {
          margin: 0;
        }
      }  
    }
    .awards_img {
      margin-right: 1rem;
      top: 6px;
      position: relative;   
    }
    h1 {
      font-size: 1.8rem;
      text-transform: uppercase;
      display:inline-block;
      margin-bottom: 3rem;
    }
    @media (max-width: 768px) {
      hr {
        margin: 0 0 5rem 0;
      }
      .name {
        margin-top: 3rem;
      }
    }
    @media (max-width: 415px) {
      .name {
          margin-top: 4rem;
      }
      hr {
          margin: 5rem 0 4rem 0;
      }
    }
`;

const PersonaPopup = ({ active, close, item }, { t }) => (
  <PersPopup>
    <Popup close={close} active={active}>
      <div className="columns">
        <div className="column is-4-desktop is-offset-1-desktop is-6-tablet">
          <div className="portrait_wraper">
            <img className="portrait" src={item.portrait.url} alt={item.people_name[0].text} />
          </div>
        </div>
        <div className="column is-4-desktop is-6-tablet">
          <div className="name">
            {RichText.render(item.people_name, PrismicConfig.linkResolver)}
          </div>
          <div className="position">
            {RichText.render(item.position, PrismicConfig.linkResolver)}
          </div>
          {item.website && item.website.url
              && (
              <a href={item.website.url}>
                <ArrowButton text="Персональный сайт" color="3998D1" />
              </a>
              )
          }
        </div>
      </div>
      <div className="columns">
        <div className="column is-11-desktop is-offset-1-desktop">
          <hr />
        </div>
      </div>
      <div className="columns">
        <div className={(item.awards[0] && (item.awards[0].text.length > 0))
          ? 'column is-5-desktop is-offset-1-desktop'
          : 'column is-10-desktop is-offset-1-desktop is-12-tablet'
                                      }
        >
          <img src="/static/bio.svg" className="awards_img" alt="" />
          <h1>{t('Биография')}</h1>
          <div className="titles">
            {RichText.render(item.titles, PrismicConfig.linkResolver)}
          </div>
        </div>
        {item.awards[0] && (item.awards[0].text.length > 0)
          && (
          <div className="column is-4-desktop is-offset-1-desktop">
            <img src="/static/awards.svg" className="awards_img" alt="" />
            <h1>{t('Достижения')}</h1>
            <div className="awards">
              {RichText.render(item.awards, PrismicConfig.linkResolver)}
            </div>
          </div>
          )
          }
      </div>
    </Popup>
  </PersPopup>
);

PersonaPopup.contextTypes = {
  t: PropTypes.func,
};

PersonaPopup.propTypes = {
  active: PropTypes.bool,
  close: PropTypes.func.isRequired,
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
};

PersonaPopup.defaultProps = {
  active: false,
  item: [],
};

export default PersonaPopup;
