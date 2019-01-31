//core modules
import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import cookies from 'next-cookies'
import Head from 'next/head'



//actions
import * as photoActions from '../redux/actions/photo'
import * as langActions from '../redux/actions/lang'
import {fetchPhotoByUidRequest, fetchPhotoByUidSuccess, fetchPhotoByUidFailure} from '../redux/actions/photo'
import { switchLanguage } from '../redux/actions/lang'

//components
import { Loading } from '../components/shared/loading.js'
import PhotoPopup from '../components/mediakit/PhotoPopup'
import PopupNoTranslation from '../components/mediakit/PopupNoTranslation'

// other libraries
import { Link, RichText } from 'prismic-reactjs'
import PrismicConfig from '../prismic-configuration'
import Prismic from 'prismic-javascript'
import hostName from '../host'
import '../scss/photogallery.scss'


class Photo extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }  

    state = {
        popupKey: -1, 
        modalActive: false

    }

    static async getInitialProps (ctx) {

        const {reduxStore, query: { uid }} = ctx
        const { language } = cookies(ctx)
        var contentLang = ""

        reduxStore.dispatch(fetchPhotoByUidRequest(uid))
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
        await api.query(Prismic.Predicates.at('my.mediakit_photo_gallery.uid', uid), { lang : "*" })
                 .then(response => {reduxStore.dispatch(fetchPhotoByUidSuccess(uid, response))
                                    // из ответа API Prismic берем значение языка, на котором создан контент
                                    // и потом передаем его в props.
                                    // Это нужно для странных случаев, когда язык, например, "ru", но 
                                    // но пользователь открывает ссылку вида .../photo/lab-of-quantum...
                                    // которая явно предполагает наличие английского языка в интерфейсе
                                    contentLang = response.results[0].lang
                  })
                 .catch(error => reduxStore.dispatch(fetchPhotoByUidFailure(uid, error)))

        

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
            if (this.props.photo.item.alternate_languages.length > 0) {
                Router.push('/photo/' + this.props.photo.item.alternate_languages[0].uid, '/photo/' + this.props.photo.item.alternate_languages[0].uid, { shallow: true })
            }
            else {this.setState({modalActive: true})}
        }
    }

    render() {
        const { isFetching, item } = this.props.photo     
        console.log("photogallery", this.props)   
        if (isFetching) return <Loading /> 
        else return (
            <Fragment>

                 <Head>
                    <title>{item.data.title[0] && item.data.title[0].text}</title>
                    <meta property="og:url"                content={hostName + "/photo/" + item.uid} />
                    <meta property="og:type"               content="article" />
                    <meta property="og:title"              content={item.data.title[0] && item.data.title[0].text} />
                    <meta property="og:description"        content={item.data.description[0] && item.data.description[0].text} />
                    <meta property="og:image"              content={item.data.photo_set[0] && item.data.photo_set[0].photo.url}  />
                    <meta property="og:image:width"        content={item.data.photo_set[0] && item.data.photo_set[0].photo.dimensions.width} />
                    <meta property="og:image:height"       content={item.data.photo_set[0] && item.data.photo_set[0].photo.dimensions.height} />
                </Head>

                <PopupNoTranslation active={this.state.modalActive} click={this.redirect} />

                <section className="photo-gallery-page">
                    {item.data && 
                        <div className="container">
                                {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                            <div className="columns is-multiline">
                                <div className="column is-7-desktop is-12-tablet">
                                    <div className="description">
                                        {RichText.render(item.data.description, PrismicConfig.linkResolver)}
                                    </div>
                                </div>
                                <div className="column is-5-desktop">
                                    <div className="download_wrapper">
                                        <a href={Link.url(item.data.archive_url)} target="_blank" rel="noopener noreferrer">
                                            <button className="download" />
                                            <p>{this.context.t("Скачать архив")}</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="columns is-multiline is-mobile">
                                {item.data.photo_set.map((element, index) => 
                                    <div className="column is-6-mobile is-4-tablet is-3-desktop" key={index}>
                                        <img src={element.photo.thumbnail.url} alt={element.photo.alt} onClick={e => {this.handleClick(e, index)}}/>
                                        <PhotoPopup key={index} 
                                                    i={index}
                                                    item={element} 
                                                    uid={item.uid}
                                                    gallery_title={item.data.title[0].text}
                                                    photo_set={item.data.photo_set}
                                                    active={this.state.popupKey === index} 
                                                    close={this.popupClose}/>
                                    </div>
                                )}

                            </div>
                        </div>
                    }
                </section>
            </Fragment>

        )
    }

    redirect = () => {
        Router.push('/mediakit/')
      }

    handleClick = (e, cardNumber) => {
        e.preventDefault()
        this.setState({
            popupKey: cardNumber
        })
        document.body.classList.add('noscroll')
    }
    popupClose = (e) => {
        e.preventDefault()
        this.setState({popupKey: -1})
        document.body.classList.remove('noscroll')
    }
}

const mapStateToProps = state => {
    const { photo, language } = state
    const { lang } = state.i18nState
    return { photo, lang, language }
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        photoActions,
        langActions
        ), dispatch);
    }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Photo)
  