//core modules
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import Router from 'next/router'
import Head from 'next/head'

//actions
import * as eventActions from '../redux/actions/event'
import {fetchEventByUidRequest, fetchEventByUidSuccess, fetchEventByUidFailure } from '../redux/actions/event'
import * as langActions from '../redux/actions/lang'

//components
import Socials from '../components/shared/Socials'
import EventHero from '../components/event/EventHero'

// other libraries
import Prismic from 'prismic-javascript'
import { RichText, Link, Date } from 'prismic-reactjs';
import PrismicConfig from '../prismic-configuration';
import hostName from '../host'
import moment from 'moment'
import 'moment/locale/ru'
import '../scss/event.scss'


class Event extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  static contextTypes = {
    t: PropTypes.func
  }

  static async getInitialProps (ctx) {

    const {reduxStore, query: { uid }} = ctx
    var contentLang = ""

    reduxStore.dispatch(fetchEventByUidRequest(uid))
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    await api.query(Prismic.Predicates.at('my.event.uid', uid), { lang : "*" })
             .then(response => {reduxStore.dispatch(fetchEventByUidSuccess(uid, response))
                                // из ответа API Prismic берем значение языка, на котором создан контент
                                // и потом передаем его в props.
                                // Это нужно для странных случаев, когда язык, например, "ru", но 
                                // но пользователь открывает ссылку вида .../event/icqt-conference
                                // которая явно предполагает наличие английского языка в интерфейсе
                                contentLang = response.results[0].lang})
             .catch(error => reduxStore.dispatch(fetchEventByUidFailure(uid, error)))
    return {uid, contentLang}
  }

  componentDidMount() {
    if(this.props.contentLang !== this.props.lang) {
        this.props.switchLanguageProgrammatically(this.props.contentLang)
    }
  }
  

  componentDidUpdate(prevProps) {

    // если глобально меняется язык и мы знаем, что он поменялся в результате 
    // действий пользователя (userClicked), то редиректим пользователя на страницу с другим uid
    // если бы мы не было флага userClicked, то компонент бы уходил в бесконечный цикл
    // из-за изменения языка в componentDidMount()

    if ((this.props.lang !== prevProps.lang) && (this.props.language.userClicked !== prevProps.language.userClicked)) {
      if (this.props.event.item.alternate_languages.length > 0) {
        Router.push('/event/' + this.props.event.item.alternate_languages[0].uid)
        }
      else {this.setState({modalActive: true})}
      }

  }

  render() {

    const { event, phone, tablet } = this.props
    if (this.props.lang === "ru") {
      moment.locale('ru')
    } else moment.locale('en')
  
    // если мероприятие идет несколько дней, то разбираем объект Date на части
    // и составляем сложную дату вида July 15-19, 2019
    const date_start_end = moment(Date(event.item.data.start_date_time)).format('MMMM') + " " + 
                           moment(Date(event.item.data.start_date_time)).format('DD') + "-" +
                           moment(Date(event.item.data.end_date)).format('DD') + ", " + 
                           moment(Date(event.item.data.start_date_time)).format('YYYY')
    const date = event.item.data.end_date ? date_start_end : moment(Date(event.item.data.start_date_time)).format('LL') 

    return (
      <div className="event-page">
        <Head>
          <title>{event.item.data.title[0] && event.item.data.title[0].text}</title>
          <meta property="og:url"                content={hostName + "/event/" + this.props.uid} />
          <meta property="og:type"               content="article" />
          <meta property="og:title"              content={event.item.data.title[0] && event.item.data.title[0].text} />
          <meta property="og:description"        content={event.item.data.description[0] && event.item.data.description[0].text} />
          <meta property="og:image"              content={event.item.data.wallpaper && event.item.data.wallpaper.url}  />
          <meta property="og:image:width"        content={event.item.data.wallpaper.dimensions && event.item.data.wallpaper.dimensions.width} />
          <meta property="og:image:height"       content={event.item.data.wallpaper.dimensions && event.item.data.wallpaper.dimensions.height} />
        </Head>

        {/* тело новости */}

        {event.item.data && 
          <Fragment>
            <Media  query="(min-width: 769px)"
            defaultMatches={phone === null && tablet === null}
            render={() => <EventHero  backImage={event.item.data.wallpaper.url ? event.item.data.wallpaper.url : ""} 
                                      tags={event.item.tags} 
                                      title={event.item.data.title} 
                                      additional={event.item.data.additional}
                                      description={event.item.data.description}
                          />
                    }
            />
            <Media  query="(min-width: 416px) and (max-width:768px)"
                    defaultMatches={tablet !== null}
                    render={() => <EventHero  backImage={event.item.data.wallpaper.coverIpad.url ? event.item.data.wallpaper.coverIpad.url : ""} 
                                              tags={event.item.tags} 
                                              title={event.item.data.title} 
                                              additional={event.item.data.additional}
                                              description={event.item.data.description}
                                  />
                          }
            />
            <Media  query="(max-width:415px)"
                    defaultMatches={phone !== null}
                    render={() => <EventHero  backImage={event.item.data.wallpaper.coverMobile.url ? event.item.data.wallpaper.coverMobile.url : ""} 
                                              tags={event.item.tags} 
                                              title={event.item.data.title} 
                                              additional={event.item.data.additional}
                                              description={event.item.data.description}
                                  />
                          }
            />
          </Fragment>
        }
        <section className="event-details">
            <div className="container">
                <div className="columns">
                    <div className="column is-3-desktop is-3-tablet is-12-mobile">
                      {(event.item.data.lecturer.length > 0) && 
                        <div className="lecturer">
                            <h2>
                                {this.context.t("Лектор")}                        
                            </h2>
                              <Fragment>
                                <img src={event.item.data.lecturer_photo.url} alt={event.item.data.lecturer[0].text} />
                                {RichText.render(event.item.data.lecturer, PrismicConfig.linkResolver)}
                                {RichText.render(event.item.data.lecturer_position, PrismicConfig.linkResolver)}
                              </Fragment>
                        </div>
                      }
                      <div className="when">
                        <p>
                          <b>
                            {this.context.t("Когда")}:
                          </b>
                        </p>
                        {date}<br />
                        {moment(Date(event.item.data.start_date_time)).format('HH:mm a')}                     
                      </div>
                      <div className="where">
                        <p>
                          <b>{this.context.t("Где")}:</b>
                        </p>
                          <a href={Link.url(event.item.data.place_link, PrismicConfig.linkResolver)} target="_blank" rel="noopener noreferrer">
                            {RichText.render(event.item.data.place, PrismicConfig.linkResolver)}
                          </a>
                          {RichText.render(event.item.data.place_details, PrismicConfig.linkResolver)}
                      </div>
                      <div className="fee">
                        <b>
                          {RichText.render(event.item.data.fee, PrismicConfig.linkResolver)}
                        </b>
                        {RichText.render(event.item.data.ps, PrismicConfig.linkResolver)}
                      </div>
                      {event.item.data.partner_logo && 
                        <div className="partner">
                          <img src={event.item.data.partner_logo.url} alt=""/>
                        </div>
                      }
                    </div>
                    <div className="column is-8-desktop is-offset-1-desktop is-8-tablet is-offset-1-tablet is-12-mobile">
                      <div className="event-info">
                        {RichText.render(event.item.data.more_info, PrismicConfig.linkResolver)}
                      </div>

                      <hr/>

                      {event.item.data && 

                      <Socials url={hostName + "/event/" + this.props.uid} 
                              quote={event.item.data.title[0].text}
                              image={event.item.data.wallpaper.url}
                      />    
                      }
                    </div>
                </div>
            </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { event, language } = state
  const { lang } = state.i18nState
  return { event, lang, language }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
      eventActions,
      langActions
      ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Event)
