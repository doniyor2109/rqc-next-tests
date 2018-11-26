//core modules
import React, {Fragment} from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Media from 'react-media'
import Head from 'next/head'
import cookies from 'next-cookies'

//actions
import * as aboutActions from '../redux/actions/about'
import * as langActions from '../redux/actions/lang'
import { fetchAbout, fetchAboutRequest, fetchAboutSuccess, fetchAboutError } from '../redux/actions/about'

//components
import Partner from '../components/Partner.js'
import Vacancies from '../components/about/Vacancies'
import AnnualReports from '../components/sliders/AnnualReports';
import Contacts from '../components/about/Contacts'
import BlueButton from '../components/shared/BlueButton'
import {ArrowButton} from '../components/shared/ArrowButton'

//other libraries
import { RichText } from 'prismic-reactjs';
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration';
import htmlSerializer from '../components/shared/htmlSerializer'
import hostName from '../host'

class About extends React.Component {

    static async getInitialProps (ctx) {
        
        // получаем все необходимое для рендеринга компонента от сервера
        const {reduxStore, query} = ctx
        const {fb_locale} = query

        // получаем настройки языка из кукис 
        const { language } = cookies(ctx)
        
        // запрос к Prismic через redux actons с добавлением контента в redux store
        reduxStore.dispatch(fetchAboutRequest())
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
        await api.query(Prismic.Predicates.at('document.type', 'about'), { lang: language})
           .then(response => reduxStore.dispatch(fetchAboutSuccess(response)))
           .catch(error => reduxStore.dispatch(fetchAboutError(error)));        

        return {fb_locale}
    }

    state = {
        more_info_button_is_active: true
    }

    static contextTypes = {
        t: PropTypes.func
    }

    componentDidUpdate(prevProps) {

        // обработка смены языка
        if (this.props.lang !== prevProps.lang) {
          this.props.fetchAbout(this.props.lang)
        }
      }

    render() {

        const { page } = this.props.about
        const { phone, tablet, fb_locale } = this.props
        // console.log("about fb locale", this.props.fb_locale, this.props.fb_locale === "ru_RU")
        // console.log("about query", this.props.query)

        return (
            <div className="aboutpage">
                <Head>
                    <meta property="og:locale" content="ru_RU" />
                    <meta property="og:locale:alternate" content="en_US" />
                    <title>{this.context.t("Что мы делаем")}</title>
                {(typeof fb_locale === 'undefined' || this.props.fb_locale === "ru_RU") && 
                    <Fragment>
                        <meta property="og:url"                content={hostName + "/about"} />
                        <meta property="og:title"              content="Что мы делаем" />
                        <meta property="og:description"        content="Уникальный для России формат научного центра, занимающегося как фундаментальными исследованиями, так и разработкой устройств, основанных на квантовых эффектах. Занимает лидирующие позиции в научной области, а также в разработке высокотехнологичных коммерческих продуктов." />
                        <meta property="og:image"              content={hostName + "/static/wallpaper1.jpg"} />
                    </Fragment>
                }
                {this.props.fb_locale === "en_US" && 
                    <Fragment>
                        <meta property="og:url"                content={hostName + "/about"} />
                        <meta property="og:type"               content="article" />
                        <meta property="og:title"              content="What we do" />
                        <meta property="og:description"        content="Some description" />
                        <meta property="og:image"              content={hostName + "/static/wallpaper1.jpg"} />
                    </Fragment>
                }
                </Head>
                <section id="what-we-do" className="whatwedo">
                    <div className="container">
                        {page.data && 
                        <div className="columns">
                            <Media query="(min-width: 416px)"
                                   defaultMatches={phone === null}
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
                                    defaultMatches={phone !== null}
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
            
                                        <div id="contact">
                                            <Contacts page={page}/>
                                        </div>                                  
                                    </Fragment>
                                    }

                            />
                        </div>  
                        }
                    </div>
                </section>
                <div id="vacancies">
                    <Vacancies phone={phone} tablet={tablet} />
                </div>
                <section className="reports_and_media_kit">
                    <div className="container">
                        <div className="columns is-multiline">
                            <div className="column is-2-tablet is-hidden-desktop is-hidden-mobile"></div>
                            <div className="column is-12-mobile is-8-tablet is-6-desktop">
                            <h3>
                                {this.context.t("Годовые отчеты")} 
                            </h3>
                            <Link href="/reports">
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
               
                <section className="partners" id="partners">
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
    const { about } = state
    const { lang } = state.i18nState
    return { about, lang }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        aboutActions, 
        langActions
        ), dispatch);
}

  
// export default connect(mapStateToProps, mapDispatchToProps)(About)

export default connect(mapStateToProps, mapDispatchToProps)(About)
