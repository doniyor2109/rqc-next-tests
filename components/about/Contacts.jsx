import React from 'react';
import { RichText, Link } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import RqcMap from './RqcMap'
import StyledContacts from './styled/StyledContacts';
import H3 from '../shared/styled/H3';

const Contacts = ({ page, lang }) => (
  <StyledContacts id="contact">
    <div className="container">
      <H3>
        {page.data.contacts_title[0].text}
      </H3>
    </div>
    <div className="contacts_wrapper">
      <div className="container">
        <div className="columns">
          <div className="column is-6-desktop is-6-tablet is-12-mobile">
            <div className="howtogethere">
              <img className="contacts_icon" src="/static/address_icon.svg" alt="address icon" />
              <div className="address">
                {RichText.render(page.data.address, PrismicConfig.linkResolver)}
                {RichText.render(page.data.directions_title, PrismicConfig.linkResolver)}
                {RichText.render(page.data.directions, PrismicConfig.linkResolver)}
              </div>
            </div>
            <div className="is-hidden-desktop is-hidden-tablet map-phone">
              <RqcMap lang={lang} />
            </div>
            <div className="contacts_phone_mail">
              <img className="contacts_icon" src="/static/phone_icon.svg" alt="address icon" />
              <div style={{ display: 'inline-block' }}>
                {RichText.render(page.data.phone_description, PrismicConfig.linkResolver)}
                <br />
                <br />
                {RichText.render(page.data.phone, PrismicConfig.linkResolver)}
              </div>
            </div>
            <div className="contacts_phone_mail">
              <img className="contacts_icon" src="/static/email_icon.svg" alt="address icon" />
              <a href={`mailto:${page.data.email[0].text}`} style={{ display: 'inline', textDecoration: 'underline' }}>
                {RichText.render(page.data.email, PrismicConfig.linkResolver)}
              </a>
            </div>
            <div className="pr_wrapper">
              {RichText.render(page.data.pr_title, PrismicConfig.linkResolver)}
              {RichText.render(page.data.pr_manager_name, PrismicConfig.linkResolver)}
              <a href={`mailto:${page.data.pr_manager_email[0].text}`} style={{ textDecoration: 'underline' }}>
                {RichText.render(page.data.pr_manager_email, PrismicConfig.linkResolver)}
              </a>
            </div>
          </div>
          <div className="column is-6-desktop is-6-tablet is-12-mobile">
            <div className="map">
              <RqcMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  </StyledContacts>
);

export default Contacts;
