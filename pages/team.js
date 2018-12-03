//core modules
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import cookies from 'next-cookies'

//actions
import * as teamActions from '../redux/actions/team'
import * as langActions from '../redux/actions/lang'
import {fetchTeamRequest, fetchTeamSuccess, fetchTeamFailure} from '../redux/actions/team'

//components
import { Loading } from '../components/shared/loading.js'
import Milestones from '../components/sliders/Milestones'
import Topics from '../components/sliders/Topics'
import LabImage from '../components/sliders/LabImage'

// other libraries
import moment from 'moment'
import 'moment/locale/ru'
import { RichText } from 'prismic-reactjs'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration'


class Team extends Component {

  static propTypes = {
    team: PropTypes.object.isRequired,
    fetchTeam: PropTypes.func.isRequired
  }

  static contextTypes = {
    t: PropTypes.func
  }

  static async getInitialProps (ctx) {

    const {reduxStore, query: { uid }} = ctx
    const { language } = cookies(ctx)

    reduxStore.dispatch(fetchTeamRequest(uid))
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    await api.query(Prismic.Predicates.at('my.science_group.uid', uid), { lang : language, 
                                                                    fetchLinks : ['scientist.name', 
                                                                                    'scientist.position', 
                                                                                    'scientist.photo'
                                                                                    ] }, )
             .then(response => reduxStore.dispatch(fetchTeamSuccess(uid, response)))
             .catch(error => reduxStore.dispatch(fetchTeamFailure(uid, error)))

    return {uid}
  }

  
  state = {
      modalActive: false,
      moreNewsQuantity: 4
    }

  componentDidUpdate(prevProps, prevState) {

    // если глобально меняется язык, то редиректим пользователя на страницу с другим uid
    if (this.props.lang !== prevProps.lang) {
      if (this.props.team.item.alternate_languages.length > 0) {
       Router.push('/team/' + this.props.team.item.alternate_languages[0].uid)
      }
    }

  }

  render() {

    const { team, phone, tablet } = this.props

    console.log("team", this.props)

    if (this.props.lang === "ru") {
      moment.locale('ru')
    } else moment.locale('en')

    // показываем анимацию в момент загрузки новости
    if (team.isFetching) {
        return <Loading />
        } else 
        return (
            <div className="teampage">
                {team.item.data && 
                <Fragment>

                    <section className="team-header">
                      <div className="container">
                          <div className="columns is-multiline">
                            <div className="column is-12-desktop">
                              <h3>
                                  {this.context.t("Группа")}                        
                              </h3>
                              {RichText.render(team.item.data.groupname, PrismicConfig.linkResolver)}
                            </div>
                            <div className="column is-3-desktop">
                              <div className="team-leader">
                                <h3>
                                    {this.context.t("Руководитель")}                        
                                </h3>
                                {team.item.data.group_leader.data && 
                                  <Fragment>
                                    <img src={team.item.data.group_leader.data.photo.url} alt={team.item.data.group_leader.data.name} />
                                    {RichText.render(team.item.data.group_leader.data.name, PrismicConfig.linkResolver)}
                                    {RichText.render(team.item.data.group_leader.data.position, PrismicConfig.linkResolver)}
                                  </Fragment>
                                }
                              </div>
                              <div className="team-list">
                                <h3>
                                    {this.context.t("Участники группы")}                        
                                </h3>
                                {(team.item.data.team_list.length > 0) && 
                                    RichText.render(team.item.data.team_list, PrismicConfig.linkResolver)
                                }
                              </div>
                            </div>
                            <div className="column is-9-desktop">
                              <div className="group">
                                <div className="quote-block">
                                  <img className="open-quote" src="../static/quote-mark-open.svg" alt="quotation mark" />
                                    <div className="quote">
                                        {RichText.render(team.item.data.leader_quote, PrismicConfig.linkResolver)}
                                    </div>
                                  <img className="close-quote" src="../static/quote-mark-close.svg" alt="quotation mark" />
                                </div>


                                <div className="description">
                                  {RichText.render(team.item.data.description, PrismicConfig.linkResolver)}
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </section>
                    <section className="topics"> 
                      <div className="container">
                        <div className="main-category">
                          {this.context.t("Направления исследований")}  
                        </div>
                          <Topics slides={team.item.data.topics} phone={phone} tablet={tablet} />
                      </div>
                    </section>

                    <section className="milestones-slider">
                        <div className="container">
                            <div className="main-category">
                                {this.context.t("Наши успехи")}                        
                            </div>
                            <Milestones  slides={team.item.data.milestones} phone={phone} tablet={tablet}/>
                        </div>
                    </section>    

                    <section className="lab-images">
                      <LabImage slides={team.item.data.image_gallery} phone={phone}/>
                        <div className="lab-name">
                          {this.context.t("Лаборатория группы") + " " + this.context.t("«") + team.item.data.groupname[0].text + this.context.t("»")}
                        </div>
                    </section> 

                    {/* <section className="team">
                      <div className="container">
                            <div className="main-category">
                                {this.context.t("Команда")}                        
                            </div>
                            {team.item.data  && <TeamSlider members={team.item.data.team}
                                                            isLoading={team.isFetching}
                            />}
                        </div>
                    </section>  */}

                </Fragment> }
            </div>

        )
    }
}

const mapStateToProps = state => {
  const { team } = state
  const { lang } = state.i18nState
  return { team, lang }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
    teamActions,
    langActions
    ), dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(Team)
