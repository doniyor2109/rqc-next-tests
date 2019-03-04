//core
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import cookies from 'next-cookies'
import Head from 'next/head'

//actions
import * as peopleActions from '../redux/actions/people'
import {fetchPeopleRequest, fetchPeopleSuccess, fetchPeopleError} from '../redux/actions/people'
import * as langActions from '../redux/actions/lang'

//components
import { Loading } from '../components/shared/loading.js'
import { RichText } from 'prismic-reactjs'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration'
import Persona from '../components/people/Persona.js'

import hostName from '../host'

class People extends React.Component {

    state = {
        modalActive: false,
        boardMobileNumber: 3,
        intMobileNumber: 3,
        trusteesMobileNumber: 3,
        more_info_button1_is_active: true,
        more_info_button2_is_active: true,
        more_info_button3_is_active: true
    }

    static contextTypes = {
        t: PropTypes.func
    }

    static async getInitialProps (ctx) {
        
        // получаем все необходимое для рендеринга компонента от сервера
        const {reduxStore} = ctx
        
        // получаем настройки языка из кукис 
        const { language } = cookies(ctx)
        
        // запрос к Prismic через redux actons с добавлением контента в redux store
        reduxStore.dispatch(fetchPeopleRequest())
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
        await api.query(Prismic.Predicates.at('document.type', 'people'), { lang: language})
           .then(response => reduxStore.dispatch(fetchPeopleSuccess(response)))
           .catch(error => reduxStore.dispatch(fetchPeopleError(error)));        

        return {}
    }

    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            this.props.fetchPeople(this.props.lang)
        }
    }



    render() {
        const { phone, tablet } = this.props

        // console.log("people", this.props)
        const { isFetching, page } = this.props.people
        if (isFetching) return <Loading />
        else return (
            <section className="peoplepage">
                <Head>
                    <title>{this.context.t("Коллектив Центра")}</title>
                    <meta property="og:url"                content={hostName + "/people"} />
                    <meta property="og:type"               content="article" />
                    <meta property="og:image"              content={hostName + "/static/unusov.png"} />
                    <meta property="og:locale:alternate"   content="en_US" />
                {(typeof fb_locale === 'undefined' || this.props.fb_locale === "ru_RU") && 
                    <Fragment>
                        <meta property="og:locale"             content="ru_RU" />
                        <meta property="og:title"              content="Коллектив Центра" />
                        <meta property="og:description"        content="Администрация, Попечительский и Научный совет Российского Квантового Центра" />
                    </Fragment>
                }
                {this.props.fb_locale === "en_US" && 
                    <Fragment>
                        <meta property="og:locale"             content="en_US" />
                        <meta property="og:title"              content="Employees of the Center" />
                        <meta property="og:description"        content="Administration, Boards of Trustees, and Scientific Committee of the RQC" />
                    </Fragment>
                }
                </Head>

                <div className="container">


                {/* РУКОВОДСТВО */}
                <Media query="(min-width: 416px)"
                       defaultMatches={phone === null}
                       render={() => <div id="board" className="people-section">
                                        {page.data && RichText.render(page.data.body[0].primary.team_section, PrismicConfig.linkResolver)}
                                        <div className="columns is-multiline">
                                            {page.data && page.data.body[0].items.map((persona, index) => 
                                                <Persona item={persona} key={index} />
                                            )}
                                        </div>
                                     </div>
                                }
                />
                <Media  query="(max-width: 415px)"
                        defaultMatches={phone !== null}
                        render={() =>  <div id="board" className="people-section">
                                            {page.data && RichText.render(page.data.body[0].primary.team_section, PrismicConfig.linkResolver)}
                                            <div className="columns is-multiline">
                                                {page.data && page.data.body[0].items.map((persona, index) => 
                                                    <Persona item={persona} key={index} />
                                                )}
                                            </div>
                                            {page.data && (page.data.body[0].items.length > 3) && this.state.more_info_button1_is_active &&
                                                <div className="button-wraper">
                                                    <img src="/static/more.svg" onClick={this.boardClick} />
                                                </div>
                                            }
                                        </div>
                                }
                />

                {/* МЕЖДУНАРОДНЫЙ СОВЕТ */}

                <Media query="(min-width: 416px)"
                       defaultMatches={phone === null}
                       render={() => <div id="international-board" className="people-section">
                                        {page.data && RichText.render(page.data.body1[0].primary.team_section, PrismicConfig.linkResolver)}
                                        <div className="columns is-multiline">
                                            {page.data && page.data.body1[0].items.map((persona, index) => 
                                                <Persona item={persona} key={index} onClick={this.popupOn}/>
                                            )}
                                        </div>
                                     </div>
                                }
                />
                <Media  query="(max-width: 415px)"
                        defaultMatches={phone !== null}
                        render={() =>   <div id="international-board" className="people-section">
                                            {page.data && RichText.render(page.data.body1[0].primary.team_section, PrismicConfig.linkResolver)}
                                            <div className="columns is-multiline">
                                                {page.data && page.data.body1[0].items.slice(0,this.state.intMobileNumber).map((persona, index) => 
                                                    <Persona item={persona} key={index} onClick={this.popupOn}/>
                                                )}
                                            </div>
                                            {page.data && (page.data.body1[0].items.length > 3) && this.state.more_info_button2_is_active &&
                                                <div className="button-wraper">
                                                    <img src="/static/more.svg" onClick={this.intClick} />
                                                </div>
                                            } 
                                        </div>
                                }
                />


                {/* ПОПЕЧИТЕЛЬСКИЙ СОВЕТ */}

                <Media query="(min-width: 416px)"
                       defaultMatches={phone === null}
                       render={() =>   <div id="board-of-trustees" className="people-section">
                                            {page.data && RichText.render(page.data.body2[0].primary.team_section, PrismicConfig.linkResolver)}
                                            <div className="columns is-multiline">
                                                {page.data && page.data.body2[0].items.map((persona, index) => 
                                                    <Persona item={persona} key={index} />
                                                )}
                                            </div>
                                        </div>
                                }
                />
                <Media  query="(max-width: 415px)"
                        defaultMatches={phone !== null}
                        render={() =>   <div id="board-of-trustees" className="people-section">
                                            {page.data && RichText.render(page.data.body2[0].primary.team_section, PrismicConfig.linkResolver)}
                                            <div className="columns is-multiline">
                                                {page.data && page.data.body2[0].items.slice(0,this.state.trusteesMobileNumber).map((persona, index) => 
                                                    <Persona item={persona} key={index} />
                                                )}
                                            </div>
                                            {page.data && (page.data.body2[0].items.length > 3) && this.state.more_info_button3_is_active &&
                                                <div className="button-wraper">
                                                    <img src="/static/more.svg" onClick={this.trusteesClick} />
                                                </div>
                                            }
                                        </div>
                                }
                />
                </div>
            </section>

        )
    }

    boardClick = (e) => {
        e.preventDefault()
        this.setState({
            more_info_button1_is_active: !this.state.more_info_button1_is_active,
            boardMobileNumber: this.props.people.page.data.body[0].items.length,
        })
    }


    intClick = (e) => {
        e.preventDefault()
        this.setState({
            more_info_button2_is_active: !this.state.more_info_button2_is_active,
            intMobileNumber: this.props.people.page.data.body1[0].items.length,
        })
    }


    trusteesClick = (e) => {
        e.preventDefault()
        this.setState({
            more_info_button3_is_active: !this.state.more_info_button3_is_active,
            trusteesMobileNumber: this.props.people.page.data.body2[0].items.length,
        })
    }

}


const mapStateToProps = state => {
    const { people } = state
    const { lang } = state.i18nState
    return { people, lang }
  }

  
const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        peopleActions, 
        langActions
        ), dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(People)
  