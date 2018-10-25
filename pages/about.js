//core modules
import React, {Fragment} from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Media from 'react-media'

//actions
import * as aboutActions from '../redux/actions/about'
import * as langActions from '../redux/actions/lang'

//components
import { Loading } from '../components/shared/loading.js'
import Partner from '../components/Partner.js'
import Vacancies from '../components/about/Vacancies'
import AnnualReports from '../components/sliders/AnnualReports';
import Contacts from '../components/about/Contacts'
import BlueButton from '../components/shared/BlueButton'
import {ArrowButton} from '../components/shared/ArrowButton'

//other libraries
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../prismic-configuration';
import htmlSerializer from '../components/shared/htmlSerializer'

class About extends React.Component {

    state = {
        more_info_button_is_active: true
    }

    static contextTypes = {
        t: PropTypes.func
    }
    
    componentDidMount() {
        this.props.fetchAbout(this.props.language.currentLanguage)
    }

    componentDidUpdate(prevProps) {

        // обработка смены языка
        if (this.props.language.currentLanguage !== prevProps.language.currentLanguage) {
          this.props.fetchAbout(this.props.language.currentLanguage)
        }
      }

    render() {

        const { page, isFetching } = this.props.about
        console.log("about", this.props)
        if (isFetching) return <Loading />
        else return (
            <div className="aboutpage">
                <section ref="what-we-do" className="whatwedo">
                    <div className="container">
                        {page.data && 
                            <div className="columns">

                                    <Media query="(min-width: 416px)"
                                            render={() => 
                                            <Fragment>
                                                <div className="column is-8-desktop">
                                                    {RichText.render(page.data.title, PrismicConfig.linkResolver)}
                                                    {RichText.render(page.data.description_title, PrismicConfig.linkResolver, htmlSerializer)}  
                                                    {RichText.render(page.data.description, PrismicConfig.linkResolver, htmlSerializer)}  
                                                    {RichText.render(page.data.goals_title, PrismicConfig.linkResolver, htmlSerializer)}  
                                                    {RichText.render(page.data.goals, PrismicConfig.linkResolver)}  
                                                </div>
                    
                                                <Contacts page={page}/>
                                            </Fragment>
                                            }
                                    />
                                    <Media  query="(max-width: 415px)"
                                            render={() => 
                                            <Fragment>
                                                <div className="column is-12">
                                                    {RichText.render(page.data.title, PrismicConfig.linkResolver)}
                                                    {RichText.render(page.data.description_title, PrismicConfig.linkResolver, htmlSerializer)}  
                                                    {RichText.render(page.data.description, PrismicConfig.linkResolver, htmlSerializer)}
                                                    {!this.state.more_info_button_is_active && 
                                                        RichText.render(page.data.goals_title, PrismicConfig.linkResolver, htmlSerializer)}  
                                                    {!this.state.more_info_button_is_active &&   
                                                        RichText.render(page.data.goals, PrismicConfig.linkResolver)}  
                                                    <div className="button-wraper">
                                                        <BlueButton onClick={this.hadleClick}>
                                                            {this.state.more_info_button_is_active 
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

                                                </div>
                    
                                                <Contacts page={page} />
                                            </Fragment>
                                            }
                                    />
                            
                            </div>  
                        }
                    </div>
                </section>
                <Vacancies ref="vacancies" />
                <section className="reports_and_media_kit">
                    <div className="container">
                        <div className="columns is-multiline">
                            <div className="column is-2-tablet is-hidden-desktop is-hidden-mobile"></div>
                            <div className="column is-12-mobile is-8-tablet is-6-desktop">
                            <h3>
                                {this.context.t("Годовые отчеты")} 
                            </h3>
                            <Link href="/evaluation-reports">
                                <a className="main-category-link">
                                    {this.context.t("смотреть все")}
                                </a>
                            </Link>
                                {page.data && <AnnualReports slides={page.data.body1[0].items}/> }
                            </div>
                            <div className="column is-2-tablet is-hidden-desktop is-hidden-mobile"></div>
                            <div className="column is-2-tablet is-hidden-desktop is-hidden-mobile"></div>
                            <div className="column is-6-desktop is-8-tablet">
                                <div className="media-kit-teaser">
                                    <Link href="/mediakit">
                                        <a>
                                            <img className="mediakit-wallpaper" src="/static/mediakit_teaser.jpg" alt=""/>
                                            <div className="title">
                                                {this.context.t("Медиакит RQC")}
                                            </div>
                                            <div className="description">
                                                {this.context.t("Фотографии, видео материалы и презентации Российского квантового центра")}
                                            </div>
                                            <ArrowButton color="ffffff"/>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               
                <section ref="partners" className="partners">
                    {page.data && 
                        <div className="container">
                            {RichText.render(page.data.body[0].primary.partners_section_name, PrismicConfig.linkResolver)}
                            <div className="columns is-multiline">
                                {page.data.body[0].items.map((item, index) => <Partner item={item} key={index} />)}
                            </div>
                        </div>
                    }
                </section> 
            </div>
        )
    }

    hadleClick = (e) => {
        e.preventDefault()
        this.setState({
            more_info_button_is_active: !this.state.more_info_button_is_active
        })
    }
}


const mapStateToProps = state => {
    const { about, language } = state
    const { lang } = state.i18nState
    return { about, lang, language }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        aboutActions, 
        langActions
        ), dispatch);
}

  
export default connect(mapStateToProps, mapDispatchToProps)(About)
  