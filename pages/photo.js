//core modules
import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import cookies from 'next-cookies'


//actions
import * as photoActions from '../redux/actions/photo'
import * as langActions from '../redux/actions/lang'
import {fetchPhotoByUidRequest, fetchPhotoByUidSuccess, fetchPhotoByUidFailure} from '../redux/actions/photo'

//components
import { Loading } from '../components/shared/loading.js'
import PhotoPopup from '../components/mediakit/PhotoPopup'
import PopupNoTranslation from '../components/mediakit/PopupNoTranslation'

// other libraries
import { Link, RichText } from 'prismic-reactjs'
import PrismicConfig from '../prismic-configuration'
import Prismic from 'prismic-javascript'
import moment from 'moment'
import 'moment/locale/ru'

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

        reduxStore.dispatch(fetchPhotoByUidRequest(uid))
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
        await api.query(Prismic.Predicates.at('my.mediakit_photo_gallery.uid', uid), { lang : language })
                 .then(response => {
                   reduxStore.dispatch(fetchPhotoByUidSuccess(uid, response))
                  })
                 .catch(error => reduxStore.dispatch(fetchPhotoByUidFailure(uid, error)))

        return {uid}
      }

    componentDidUpdate(prevProps) {

        // если глобально меняется язык, то редиректим пользователя на страницу с другим uid
        if (this.props.lang !== prevProps.lang) {
            if (this.props.photo.item.alternate_languages.length > 0) {
                Router.push('/photo/' + this.props.article.item.alternate_languages[0].uid)
            }
            else {this.setState({modalActive: true})}
        }
    }

    render() {
        const { isFetching, item } = this.props.photo
        // console.log("photogallery.js", this.props)
        if (this.props.lang === "ru") {
            moment.locale('ru')
        } else moment.locale('en')
        
        if (isFetching) return <Loading /> 
        else return (
            <Fragment>

                <PopupNoTranslation active={this.state.modalActive} click={this.redirect} />

                <section className="photo-gallery-page">
                    {item.data && 
                        <div className="container">
                            {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                            <div className="date">
                                {moment(item.first_publication_date).format('LL')}
                            </div>
                            <div className="description">
                                {RichText.render(item.data.description, PrismicConfig.linkResolver)}
                            </div>
                            <div className="download_wrapper">
                                <a href={Link.url(item.data.archive_url)} target="_blank" rel="noopener noreferrer">
                                    <button className="download" />
                                    <p>{this.context.t("Скачать архив")}</p>
                                </a>
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
    const { photo } = state
    const { lang } = state.i18nState
    return { photo, lang }
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        photoActions,
        langActions
        ), dispatch);
    }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Photo)
  