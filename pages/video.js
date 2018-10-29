//core modules
import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import cookies from 'next-cookies'

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
import moment from 'moment'
import 'moment/locale/ru'
import hostName from '../host'


class Video extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }  

    state = {
    }

    static async getInitialProps (ctx) {

        const {reduxStore, query: { uid }} = ctx
        const { language } = cookies(ctx)

        reduxStore.dispatch(fetchVideoByUidRequest(uid))
        const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
        await api.query(Prismic.Predicates.at('my.mediakit_video.uid', uid), { lang : language })
                 .then(response => {
                   reduxStore.dispatch(fetchVideoByUidSuccess(uid, response))
                  })
                 .catch(error => reduxStore.dispatch(fetchVideoByUidFailure(uid, error)))

        return {uid}
      }

    componentDidUpdate(prevProps) {

        // если глобально меняется язык, то редиректим пользователя на страницу с другим uid
        if (this.props.lang !== prevProps.lang) {
            if (this.props.video.item.alternate_languages.length > 0) {
                Router.push('/video/' + this.props.post.item.alternate_languages[0].uid)
            }
            else {this.setState({modalActive: true})}
        }
    }

    render() {
        const { isFetching, item } = this.props.video
        console.log("video.js", this.props)
        if (this.props.language.currentLanguage === "ru") {
            moment.locale('ru')
        } else moment.locale('en')
        
        if (isFetching) return <Loading /> 
        else return (
            <Fragment>

                <PopupNoTranslation active={this.state.modalActive} click={this.redirect} />

                <section className="video-page">

                    {item.data && 
                    <div className="container">
                            {RichText.render(item.data.title, PrismicConfig.linkResolver)}
                            <div className="date">
                                {moment(item.first_publication_date).format('LL')}
                            </div>
                            <div className="description">
                                {RichText.render(item.data.description, PrismicConfig.linkResolver)}
                            </div>
                    <div className="video" dangerouslySetInnerHTML={{ __html: item.data.youtube_link.html }} />

                    <Socials url={hostName + "/video/" + this.props.uid} 
                           quote={item.data.title[0].text}
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
    return { video, language }
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        videoActions,
        langActions
        ), dispatch);
    }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Video)
  