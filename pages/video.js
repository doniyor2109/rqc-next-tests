//core modules
import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import cookies from 'next-cookies'
import Head from 'next/head'

//actions
import * as videoActions from '../redux/actions/video'
import * as langActions from '../redux/actions/lang'
import {fetchVideoByUidRequest, fetchVideoByUidSuccess, fetchVideoByUidFailure} from '../redux/actions/video'


//components
import { Loading } from '../components/shared/loading.js'
import PopupNoTranslation from '../components/mediakit/PopupNoTranslation'
import Socials from '../components/shared/Socials'


// other libraries
import { RichText } from 'prismic-reactjs'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration'
import hostName from '../host'
import '../scss/videopage.scss'


class Video extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }  

    static async getInitialProps (ctx) {

        const {reduxStore, query: { uid }} = ctx
        const { language } = cookies(ctx)
        var contentLang = ""

        reduxStore.dispatch(fetchVideoByUidRequest(uid))
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
        await api.query(Prismic.Predicates.at('my.mediakit_video.uid', uid), { lang : "*" })
                 .then(response => {reduxStore.dispatch(fetchVideoByUidSuccess(uid, response))
                                    // из ответа API Prismic берем значение языка, на котором создан контент
                                    // и потом передаем его в props.
                                    // Это нужно для странных случаев, когда язык, например, "ru", но 
                                    // но пользователь открывает ссылку вида .../video/alexei-ivanov-about-quantum...
                                    // которая явно предполагает наличие английского языка в интерфейсе
                                    contentLang = response.results[0].lang})
                 .catch(error => reduxStore.dispatch(fetchVideoByUidFailure(uid, error)))

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
        if (this.props.video.item.alternate_languages.length > 0) {
                Router.push('/video/' + this.props.video.item.alternate_languages[0].uid)
            }
        }
    }

    render() {
        const { isFetching, item } = this.props.video
  
        return (
            <Fragment>
                <Head>
                    <title>{item.data.title[0] && item.data.title[0].text}</title>
                    <meta property="og:url"                content={hostName + "/video/" + item.uid} />
                    <meta property="og:type"               content="video" />
                    <meta property="og:title"              content={item.data.title[0] && item.data.title[0].text} />
                    <meta property="og:description"        content={item.data.description[0] && item.data.description[0].text} />
                    <meta property="og:image"              content={item.data.youtube_link && item.data.youtube_link.thumbnail_url}  />
                    <meta property="og:image:width"        content={item.data.youtube_link && item.data.youtube_link.thumbnail_width} />
                    <meta property="og:image:height"       content={item.data.youtube_link && item.data.youtube_link.thumbnail_height} />

                </Head>
                <section className="video-page">

                    {item.data && 
                    <div className="container">
                            {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                            <div className="description">
                                {RichText.render(item.data.description, PrismicConfig.linkResolver)}
                            </div>
                    <div className="video" dangerouslySetInnerHTML={{ __html: item.data.youtube_link.html }} />

                    <Socials url={hostName + "/video/" + this.props.uid} 
                             quote={item.data.title[0].text}
                             image={item.data.youtube_link.thumbnail_url}
                    />
                    </div>
                    }

                </section>
            </Fragment>

        )
    }

    redirect = () => {
        Router.push('/mediakit/')
      }


}
const mapStateToProps = state => {
    const { video, language } = state
    const { lang } = state.i18nState
    return { video, lang, language }
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        videoActions,
        langActions
        ), dispatch);
    }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Video)
  