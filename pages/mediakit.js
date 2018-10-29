//core modules
import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Media from 'react-media'


// actions
import * as mediakitActions from '../redux/actions/mediakit'
import * as langActions from '../redux/actions/lang'

//components
import PhotoGalleries from '../components/mediakit/PhotoGalleries'
import Videos from '../components/mediakit/Videos'
import Presentations from '../components/mediakit/Presentations'


class Mediakit extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }

    render() {
        const {phone, tablet} = this.props
        console.log("mediakit", this.props)
        return (
            <div className="media-kit-page">
                <section className="title">
                    <div className="container">
                        <h1 className="page-main-heading">{this.context.t("Медиакит")}</h1>
                    </div>
                </section>
                <section className="photo-galleries">
                    <div className="container">
                        <p className="main-category">{this.context.t("Фотогалереи")}</p>
                        <Media query="(min-width: 769px)"
                               defaultMatches={phone === null && tablet === null}
                               render={() => <Fragment>
                                                <PhotoGalleries items={this.props.mediakit.photo_galleries} 
                                                                isFetching={this.props.mediakit.isFetchingPhoto} 
                                                                fetchItems={this.props.fetchPhotoGalleries}
                                                                lang={this.props.lang}
                                                                initialItems={6}
                                                                morenews={3}
                                                                nextPage={this.props.mediakit.photosNextpage}
                                                />
                                            </Fragment>
                                        }
                        />
                        <Media query="(min-width: 416px) and (max-width: 768px)"
                               defaultMatches={tablet !== null}
                               render={() => <Fragment>
                                                <PhotoGalleries items={this.props.mediakit.photo_galleries} 
                                                                isFetching={this.props.mediakit.isFetchingPhoto} 
                                                                fetchItems={this.props.fetchPhotoGalleries}
                                                                lang={this.props.lang}
                                                                initialItems={6}
                                                                morenews={2}
                                                                nextPage={this.props.mediakit.photosNextpage}
                                                />
                                            </Fragment>
                                        }
                        />
                        <Media query="(max-width: 415px)"
                               defaultMatches={phone !== null }
                               render={() => <Fragment>
                                                <PhotoGalleries items={this.props.mediakit.photo_galleries} 
                                                                isFetching={this.props.mediakit.isFetchingPhoto} 
                                                                fetchItems={this.props.fetchPhotoGalleries}
                                                                lang={this.props.lang}
                                                                initialItems={3}
                                                                morenews={3}
                                                                nextPage={this.props.mediakit.photosNextpage}
                                                />
                                            </Fragment>
                                        }
                        />
                    </div>
                </section>
                <section className="videoclips">
                    <div className="container">
                        <p className="main-category">{this.context.t("Видео")}</p>
                        <Media query="(min-width: 416px)"
                               defaultMatches={phone === null}
                               render={() => <Fragment>
                                                <Videos items={this.props.mediakit.videos} 
                                                        isFetching={this.props.mediakit.isFetchingVideo}
                                                        fetchItems={this.props.fetchVideo}
                                                        lang={this.props.lang}
                                                        initialItems={4}
                                                        morenews={2}
                                                        nextPage={this.props.mediakit.videosNextpage}
                                                />
                                            </Fragment>
                                        }
                        />
                        <Media query="(max-width: 415px)"
                               defaultMatches={phone !== null}
                               render={() => <Fragment>
                                                <Videos items={this.props.mediakit.videos} 
                                                        isFetching={this.props.mediakit.isFetchingVideo}
                                                        fetchItems={this.props.fetchVideo}
                                                        lang={this.props.lang}
                                                        initialItems={3}
                                                        morenews={2}
                                                        nextPage={this.props.mediakit.videosNextpage}
                                                />
                                            </Fragment>
                                        }
                        />
                    </div>
                </section>
                <section className="presentations">
                    <div className="container">
                        <p className="main-category">{this.context.t("Презентации")}</p>
                        <Media query="(min-width: 769px)"
                               defaultMatches={phone === null && tablet === null}
                               render={() => <Fragment>
                                                <Presentations  items={this.props.mediakit.presentations} 
                                                                isFetching={this.props.mediakit.isFetchingPresentations}
                                                                fetchItems={this.props.fetchPresentations}
                                                                lang={this.props.lang}
                                                                initialItems={3}
                                                                morenews={3}
                                                                nextPage={this.props.mediakit.presentationsNextpage}
                                                />
                                            </Fragment>
                                        }
                        />
                        <Media query="(min-width: 416px) and (max-width:768px)"
                               defaultMatches={tablet !== null}
                               render={() => <Fragment>
                                                <Presentations  items={this.props.mediakit.presentations} 
                                                                isFetching={this.props.mediakit.isFetchingPresentations}
                                                                fetchItems={this.props.fetchPresentations}
                                                                lang={this.props.lang}
                                                                initialItems={4}
                                                                morenews={3}
                                                                nextPage={this.props.mediakit.presentationsNextpage}

                                                />
                                            </Fragment>
                                        }
                        />
                        <Media query="(max-width: 415px)"
                               defaultMatches={phone !== null}
                               render={() => <Fragment>
                                                <Presentations  items={this.props.mediakit.presentations} 
                                                                isFetching={this.props.mediakit.isFetchingPresentations}
                                                                fetchItems={this.props.fetchPresentations}
                                                                lang={this.props.lang}
                                                                initialItems={3}
                                                                morenews={3}
                                                                nextPage={this.props.mediakit.presentationsNextpage}
                                                />
                                            </Fragment>
                                        }
                        />

                    </div>
                </section>
                {/* <section className="branding">
                    <div className="container">
                        <p className="main-category">Айдентика</p>
                    </div>
                </section> */}
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { mediakit } = state
    const { lang } = state.i18nState
    return { mediakit, lang }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({},
        mediakitActions, 
        langActions
        ), dispatch);
}

  
export default connect(mapStateToProps, mapDispatchToProps)(Mediakit)
  