//core
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Media from 'react-media'
import cookies from 'next-cookies'

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
import BlueButton from '../components/shared/BlueButton'


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
        const { isFetching, page } = this.props.people
        if (isFetching) return <Loading />
        else return (
            <section className="peoplepage">
                <Head>
                    <title>{this.context.t("Коллектив Центра")}</title>
                    <meta property="og:url"                content={hostName + "/people"} />
                    <meta property="og:type"               content="article" />
                    <meta property="og:title"              content={this.context.t("Коллектив Центра")} />
                    <meta property="og:description"        content={this.context.t("Администрация, Попечительский и Научный совет Российского Квантового Центра")} />
                    <meta property="og:image"              content="/static/unusov.jpg" />
                </Head>
                <div className="container">

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
                                            {page.data && (page.data.body[0].items.length > 3) &&
                                                <div className="button-wraper">
                                                    <BlueButton onClick={this.boardClick}>
                                                        {this.state.more_info_button1_is_active 
                                                            ? (<Fragment>
                                                                {this.context.t("Подробнее")}
                                                                <img className="arrow-down" src="/static/blue_arrow_down.svg" alt=""/>
                                                            </Fragment>)
                                                            : (<Fragment>
                                                                {this.context.t("Свернуть")}
                                                                <img className="arrow-up" src="/static/blue_arrow_down.svg" alt=""/>
                                                            </Fragment>)
                                                            }
                                                    </BlueButton>   
                                                </div>
                                            }
                                        </div>
                                }
                />

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
                                            {page.data && (page.data.body1[0].items.length > 3) &&
                                                <div className="button-wraper">
                                                    <BlueButton onClick={this.intClick}>
                                                        {this.state.more_info_button2_is_active 
                                                            ? (<Fragment>
                                                                {this.context.t("Подробнее")}
                                                                <img className="arrow-down" src="/static/blue_arrow_down.svg" alt=""/>
                                                            </Fragment>)
                                                            : (<Fragment>
                                                                {this.context.t("Свернуть")}
                                                                <img className="arrow-up" src="/static/blue_arrow_down.svg" alt=""/>
                                                            </Fragment>)
                                                            }
                                                    </BlueButton>  
                                                </div>
                                            } 
                                        </div>
                                }
                />

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
                                            {page.data && (page.data.body2[0].items.length > 3) &&
                                                <div className="button-wraper">
                                                    <BlueButton onClick={this.trusteesClick}>
                                                        {this.state.more_info_button3_is_active 
                                                            ? (<Fragment>
                                                                {this.context.t("Подробнее")}
                                                                <img className="arrow-down" src="/static/blue_arrow_down.svg" alt=""/>
                                                            </Fragment>)
                                                            : (<Fragment>
                                                                {this.context.t("Свернуть")}
                                                                <img className="arrow-up" src="/static/blue_arrow_down.svg" alt=""/>
                                                            </Fragment>)
                                                            }
                                                    </BlueButton>   
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
  