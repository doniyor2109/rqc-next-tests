import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import Head from 'next/head'

import * as eventsActions from '../redux/actions/events'
import * as langActions from '../redux/actions/lang'
import * as eventsbyTagActions from '../redux/actions/eventsbyTag'

import GridViewDesktop from '../components/events/GridViewDesktop'
import GridViewTablet from '../components/events/GridViewTablet'
import GridViewMobile from '../components/events/GridViewMobile'
import FilterTag from '../components/shared/FilterTag'
import MoreNews from '../components/events/MoreNews'
import hostName from '../host'

// Основной компонент, связывающий весь интерфейс страницы /news воедино
class Events extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTag: 'SHOW_ALL',
      firstEvents: [],
      pageSize: 8,
      pageNumber: 1,
      nextPage: '',
      moreevents_n: 0,
      FetchFirst: true,
    }
  }

  componentDidMount() {
    this.props.fetchEvents(
      this.props.lang,
      this.state.pageSize,
      this.state.pageNumber
    )
  }

  componentDidUpdate(prevProps, prevState) {
    // обработка смены языка
    if (this.props.lang !== prevProps.lang) {
      this.setState({
        FetchFirst: true,
      })
      switch (this.state.activeTag) {
        case 'SHOW_ALL':
          return this.props.fetchEvents(
            this.props.lang,
            this.state.pageSize,
            this.state.pageNumber
          )
        case 'SHOW_COLLOQUIUM':
          return this.props.fetchEventsByTag(
            this.context.t('коллоквиум'),
            this.state.pageSize
          )
        case 'SHOW_CONFERENCE':
          return this.props.fetchEventsByTag(
            this.context.t('конференция'),
            this.state.pageSize
          )
        // case 'SHOW_CHAMPIONSHIP':
        //   return this.props.fetchEventsByTag(this.context.t("Чемпионат"), this.state.pageSize)
        case 'SHOW_LECTURE':
          return this.props.fetchEventsByTag(
            this.context.t('лекция'),
            this.state.pageSize
          )
        default:
          return null
      }
    }

    // фильтр новостей по тегам
    if (this.state.activeTag !== prevState.activeTag) {
      switch (this.state.activeTag) {
        case 'SHOW_ALL':
          return this.props.fetchEvents(
            this.props.lang,
            this.state.pageSize,
            this.state.pageNumber
          )
        case 'SHOW_COLLOQUIUM':
          return this.props.fetchEventsByTag(
            this.context.t('коллоквиум'),
            this.state.pageSize
          )
        case 'SHOW_CONFERENCE':
          return this.props.fetchEventsByTag(
            this.context.t('конференция'),
            this.state.pageSize
          )
        // case 'SHOW_CHAMPIONSHIP':
        //   return this.props.fetchEventsByTag(this.context.t("Чемпионат"), this.state.pageSize)
        case 'SHOW_LECTURE':
          return this.props.fetchEventsByTag(
            this.context.t('лекция'),
            this.state.pageSize
          )
        default:
          return null
      }
    }

    // если меняются ВСЕ новости, выводим на экран их
    if (this.props.events.events !== prevProps.events.events) {
      this.setState({
        firstEvents: this.props.events.events,
        nextPage: this.props.events.nextPage,
      })
    }

    // если меняются новости по тегам, выводим их
    if (this.props.eventsbyTag.events !== prevProps.eventsbyTag.events) {
      this.setState({
        firstEvents: this.props.eventsbyTag.events,
        nextPage: this.props.eventsbyTag.nextPage,
      })
    }

    // нажатие на +
    if (this.state.pageSize !== prevState.pageSize) {
      switch (this.state.activeTag) {
        case 'SHOW_ALL':
          return this.props.fetchEvents(
            this.props.lang,
            this.state.pageSize,
            this.state.pageNumber
          )
        case 'SHOW_COLLOQUIUM':
          return this.props.fetchEventsByTag(
            this.context.t('коллоквиум'),
            this.state.pageSize
          )
        case 'SHOW_CONFERENCE':
          return this.props.fetchEventsByTag(
            this.context.t('конференция'),
            this.state.pageSize
          )
        // case 'SHOW_CHAMPIONSHIP':
        //   return this.props.fetchEventsByTag(this.context.t("Чемпионат"), this.state.pageSize)
        case 'SHOW_LECTURE':
          return this.props.fetchEventsByTag(
            this.context.t('лекция'),
            this.state.pageSize
          )
        default:
          return null
      }
    }
  }

  render() {
    const { phone, tablet } = this.props

    // console.log("events", this.props)

    return (
      <Fragment>
        <Head>
          <title>{this.context.t('Мероприятия')}</title>
          <meta
            name="description"
            content={this.context.t(
              'Открытые лекции, международные конференции, чемпионаты и выставки'
            )}
          />
          <meta property="og:url" content={hostName + '/events'} />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content={hostName + '/static/events_wall.jpg'}
          />
          <meta property="og:locale:alternate" content="en_US" />
          {(typeof fb_locale === 'undefined' ||
            this.props.fb_locale === 'ru_RU') && (
            <Fragment>
              <meta property="og:locale" content="ru_RU" />
              <meta property="og:title" content="Мероприятия" />
              <meta property="og:description" content="Мероприятия РКЦ" />
            </Fragment>
          )}
          {this.props.fb_locale === 'en_US' && (
            <Fragment>
              <meta property="og:locale" content="en_US" />
              <meta property="og:title" content="Events" />
              <meta property="og:description" content="The RQC events" />
            </Fragment>
          )}
        </Head>
        <div className="eventspage">
          <div className="container">
            <h1 className="page-main-heading">
              {this.context.t('Мероприятия')}
            </h1>
            <p className="captions">{this.context.t('Фильтр по тегам')}</p>
            <div className="tags-for-search">
              <FilterTag
                onClick={e => {
                  this.selectTag('SHOW_ALL', e)
                }}
                active={this.state.activeTag === 'SHOW_ALL' ? true : false}
              >
                {this.context.t('все мероприятия')}
              </FilterTag>
              <FilterTag
                onClick={e => {
                  this.selectTag('SHOW_LECTURE', e)
                }}
                active={this.state.activeTag === 'SHOW_LECTURE' ? true : false}
              >
                {this.context.t('лекция')}
              </FilterTag>
              <FilterTag
                onClick={e => {
                  this.selectTag('SHOW_COLLOQUIUM', e)
                }}
                active={
                  this.state.activeTag === 'SHOW_COLLOQUIUM' ? true : false
                }
              >
                {this.context.t('коллоквиум')}
              </FilterTag>
              <FilterTag
                onClick={e => {
                  this.selectTag('SHOW_CONFERENCE', e)
                }}
                active={
                  this.state.activeTag === 'SHOW_CONFERENCE' ? true : false
                }
              >
                {this.context.t('конференция')}
              </FilterTag>
              {/* <FilterTag onClick={e => {this.selectTag("SHOW_CHAMPIONSHIP", e)}}
                            active={this.state.activeTag === "SHOW_CHAMPIONSHIP" ? true : false}>
                  {this.context.t("Чемпионат")}
                </FilterTag> */}
            </div>

            <Media
              query="(max-width: 415px)"
              defaultMatches={phone !== null}
              render={() => (
                <Fragment>
                  <GridViewMobile
                    events={this.state.firstEvents}
                    isFetching={
                      (this.props.events.isFetching ||
                        this.props.eventsbyTag.isFetching) &&
                      this.state.FetchFirst
                    }
                  />

                  <MoreNews
                    nextPage={this.state.nextPage}
                    give_me_more_events={this.give_me_more_events}
                    numberOfMoreNews={3}
                    isFetching={
                      this.state.pageSize > 8 &&
                      (this.props.events.isFetching ||
                        this.props.eventsbyTag.isFetching)
                    }
                  />
                </Fragment>
              )}
            />

            <Media
              query="(min-width: 416px) and (max-width: 768px)"
              defaultMatches={tablet !== null}
              render={() => (
                <Fragment>
                  <GridViewTablet
                    events={this.state.firstEvents}
                    isFetching={
                      (this.props.events.isFetching ||
                        this.props.eventsbyTag.isFetching) &&
                      this.state.FetchFirst
                    }
                  />

                  <MoreNews
                    nextPage={this.state.nextPage}
                    give_me_more_events={this.give_me_more_events}
                    numberOfMoreNews={2}
                    isFetching={
                      this.state.pageSize > 8 &&
                      (this.props.events.isFetching ||
                        this.props.eventsbyTag.isFetching)
                    }
                  />
                </Fragment>
              )}
            />

            <Media
              query="(min-width: 769px)"
              defaultMatches={phone === null && tablet === null}
              render={() => (
                <Fragment>
                  <GridViewDesktop
                    events={this.state.firstEvents}
                    isFetching={
                      (this.props.events.isFetching ||
                        this.props.eventsbyTag.isFetching) &&
                      this.state.FetchFirst
                    }
                  />
                  <MoreNews
                    nextPage={this.state.nextPage}
                    give_me_more_events={this.give_me_more_events}
                    numberOfMoreNews={3}
                    isFetching={
                      this.state.pageSize > 8 &&
                      (this.props.events.isFetching ||
                        this.props.eventsbyTag.isFetching)
                    }
                  />
                </Fragment>
              )}
            />
          </div>
        </div>
      </Fragment>
    )
  }

  selectTag = (tag, e) => {
    e.preventDefault()
    this.setState({
      activeTag: tag,
      FetchFirst: true,
    })
  }

  give_me_more_events = (e, numberOfMore) => {
    e.preventDefault()
    this.setState({
      pageSize: this.state.pageSize + numberOfMore,
      moreevents_n: numberOfMore,
      FetchFirst: false,
    })
  }
}

// Redux функции state и dispatch
const mapStateToProps = state => {
  const { events, eventsbyTag } = state
  const { lang } = state.i18nState
  return { events, lang, eventsbyTag }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}, eventsActions, eventsbyTagActions, langActions),
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
