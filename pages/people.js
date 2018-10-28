//core
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Media from 'react-media'

//actions
import * as peopleActions from '../redux/actions/people'
import * as langActions from '../redux/actions/lang'

//components
import { Loading } from '../components/shared/loading.js'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../prismic-configuration';
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

    componentDidMount() {
        this.props.fetchPeople(this.props.lang)
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
  