import React from 'react'

import { RichText, Link } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';


class Contacts extends React.Component {

    render() {
        const { page } = this.props
        return (
            <section id="contacts">
                <div className="container">
                    {RichText.render(page.data.contacts_title, PrismicConfig.linkResolver)}
                </div>
                <div className="contacts_wrapper">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-6-desktop is-6-tablet is-12-mobile">
                                    <div className="howtogethere">
                                        <img className="contacts_icon" src="/static/address_icon.svg" alt="address icon"/>
                                        <div className="address">
                                            {RichText.render(page.data.address, PrismicConfig.linkResolver)} 
                                            {RichText.render(page.data.directions_title, PrismicConfig.linkResolver)} 
                                            {RichText.render(page.data.directions, PrismicConfig.linkResolver)} 
                                        </div>
                                    </div>
                                    <a className="is-hidden-desktop is-hidden-tablet" href={Link.url(page.data.map_url, PrismicConfig.linkResolver)} target="_blank" rel="noopener noreferrer">
                                        <img src={page.data.map.mobile.url} alt="how to get to RQC" style={{width:"100%"}}/>
                                    </a>
                                    <div className="contacts_phone_mail">
                                        <img className="contacts_icon" src="/static/phone_icon.svg" alt="address icon"/>
                                        {RichText.render(page.data.phone, PrismicConfig.linkResolver)} 
                                    </div>
                                    <div className="contacts_phone_mail">
                                        <img className="contacts_icon" src="/static/email_icon.svg" alt="address icon"/>
                                        <a href={"mailto:" + page.data.email[0].text} style={{display:"inline", textDecoration:"underline"}}>
                                            {RichText.render(page.data.email, PrismicConfig.linkResolver)} 
                                        </a>
                                    </div>
                                    <div className="pr_wrapper"> 
                                        {RichText.render(page.data.pr_title, PrismicConfig.linkResolver)} 
                                        {RichText.render(page.data.pr_manager_name, PrismicConfig.linkResolver)} 
                                        <a href={"mailto:" + page.data.pr_manager_email[0].text} style={{textDecoration:"underline"}}>
                                            {RichText.render(page.data.pr_manager_email, PrismicConfig.linkResolver)} 
                                        </a>
                                    </div>
                                </div>
                            <div className="column is-6-desktop is-6-tablet is-12-mobile">
                                <div className="map">
                                    <a className="is-hidden-tablet is-hidden-mobile" href={Link.url(page.data.map_url, PrismicConfig.linkResolver)} target="_blank" rel="noopener noreferrer">
                                        <img src={page.data.map.url} alt="how to get to RQC" style={{width:"100%"}}/>
                                    </a>
                                    <a className="is-hidden-desktop is-hidden-mobile" href={Link.url(page.data.map_url, PrismicConfig.linkResolver)} target="_blank" rel="noopener noreferrer">
                                        <img src={page.data.map.tablet.url} alt="how to get to RQC" style={{width:"100%"}}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        )
    }
}

export default Contacts