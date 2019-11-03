/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import Popup from '../shared/Popup';
import PrismicConfig from '../../prismic-configuration';
import H3 from '../shared/styled/H3';

const LeaderPopupStyled = styled.div`
    .modal-content {
      width: 92rem;
      padding: 5rem 0;
      background: white;
      min-height: 20rem;
      @media (max-width: 768px) {
        width: 90%;
        padding: 5rem 3rem;
        margin: 0px 4rem;
        overflow-y: scroll; /* has to be scroll, not auto */
        -webkit-overflow-scrolling: touch;
      }
      @media (max-width: 415px) {
        margin: 3rem 0;
        max-height: calc(100vh - 3rem);
      }
      .columns {
        width: 100%;
      }
    }
    .position {
        margin-top: 3.5rem;
        p {
            border-bottom: 0;
            font-weight: bold;
        }
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
        .portrait {
            width: 25.5rem;
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
    h3 {
        display: inline-block;
        margin-bottom: 3rem;
    }
    .wall{
      opacity: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      @media (max-width: 768px) {
        width: 92%;
        height: 92%;
      }
      background: white;
      z-index: 1;
      display: flex;
      justify-content: center;
    }
    hr {
      background-color: #D8D8D8;
    }
    @media (max-width: 768px) {
      hr {
        margin: 2.9rem 0 6rem 0;
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
        margin: 2rem 0 4rem 0;
      }
    }

    .personal_logo {
      margin-top: 2.5rem;
    }
    @media (max-width: 415px) {
      .personal_logo {
        margin-top: 2rem;
      }
    }


    .pubs_link {
        font-size: 1.4rem;
        color: #3998D1;
        font-weight: 500;
        margin-top: 3rem;
        display: block;
        cursor: pointer;
    }
`;
const LeaderPopup = ({ item, close, active }, { t }) => (
  <LeaderPopupStyled>
    <Popup close={close} active={active}>
      <div className="columns is-vcentered">
        <div className="column is-4-desktop is-offset-1-desktop is-6-tablet">
          <div className="portrait_wraper">
            <img className="portrait" src={item.photo.url} alt={item.name[0].text} />
          </div>
        </div>
        <div className="column is-4-desktop is-6-tablet">
          <div className="name">
            {RichText.render(item.name, PrismicConfig.linkResolver)}
          </div>
          <div className="position">
            {RichText.render(item.position, PrismicConfig.linkResolver)}
          </div>
          <Link href={`/publications?author=${item.publications_name}`}>
            <a className="pubs_link">
              {t('Научные публикации')}
            </a>
          </Link>
        </div>
      </div>
      <div className="columns">
        <div className="column is-11-desktop is-offset-1-desktop">
          <hr />
        </div>
      </div>
      <div className="columns">
        <div className={item.awards
          ? 'column is-5-desktop is-offset-1-desktop'
          : 'column is-10-desktop is-offset-1-desktop is-12-tablet'
        }
        >
          <img src="/static/bio.svg" className="awards_img" alt="" />
          <H3>{t('Биография')}</H3>
          <div className="titles">
            {item.titles && RichText.render(item.titles, PrismicConfig.linkResolver)}
          </div>
        </div>
        {item.awards
              && (
              <div className="column is-4-desktop is-offset-1-desktop">
                <img src="/static/awards.svg" className="awards_img" alt="" />
                <H3>{t('Достижения')}</H3>
                <div className="awards">
                  {RichText.render(item.awards, PrismicConfig.linkResolver)}
                </div>
              </div>
              )}
      </div>
    </Popup>
  </LeaderPopupStyled>
);

LeaderPopup.contextTypes = {
  t: PropTypes.func,
};

LeaderPopup.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    position: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    photo: PropTypes.PropTypes.shape({
      url: PropTypes.string,
    }),
    titles: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    awards: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    publications_name: PropTypes.string,
  }),
  close: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

LeaderPopup.defaultProps = {
  item: {},
};

export default LeaderPopup;
