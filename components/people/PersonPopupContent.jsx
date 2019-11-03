import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';


const PersonPopupContent = ({ item }, { t }) => (
  <>
    <div className="columns">
      <div className="column is-4-desktop is-offset-1-desktop is-6-tablet">
        <div className="portrait_wraper">
          <img className="portrait" src={item.portrait.url} alt={item.name[0].text} />
        </div>
      </div>
      <div className="column is-4-desktop is-6-tablet">
        <div className="name">
          {RichText.render(item.name, PrismicConfig.linkResolver)}
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
        {item.logo.url
              && (
              <img src={item.logo.url} className="personal_logo" alt="misis logo" />
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
      <div className={item.awards[0]
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
      {item.awards[0]
              && (
              <div className="column is-4-desktop is-offset-1-desktop">
                <img src="/static/awards.svg" className="awards_img" alt="" />
                <h1>{t('Достижения')}</h1>
                <div className="awards">
                  {RichText.render(item.awards, PrismicConfig.linkResolver)}
                </div>
              </div>
              )}
    </div>
  </>
);
PersonPopupContent.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    position: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    portrait: PropTypes.PropTypes.shape({
      url: PropTypes.string,
    }),
    titles: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    awards: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
    website: PropTypes.shape({
      url: PropTypes.string,
    }),
    logo: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
};

PersonPopupContent.defaultProps = {
  item: {},
};

PersonPopupContent.contextTypes = {
  t: PropTypes.func,
};

export default PersonPopupContent;
