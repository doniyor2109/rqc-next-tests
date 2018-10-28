import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Media from 'react-media'

import * as mainActions from '../redux/actions/main'
import * as langActions from '../redux/actions/lang'

import { NewscardSmall } from '../components/news/NewscardSmall.js'
import MainSlider from '../components/sliders/MainSlider'
import SciSlider from '../components/sliders/SciSlider'

class MainPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      news_quantity: 3
    }
  }

  componentDidMount() {
      window.scrollTo(0, 0)
      if (this.props.lang === "en-gb") {
        this.props.fetchMainSlider('W3GV8SQAACQAZAwG', "en-gb")
      } else if (this.props.lang === "ru") {
        this.props.fetchMainSlider('W3GVDyQAACYAZAgb', "ru")
      }
      this.props.fetchMainSciSlider(this.props.lang)
      this.props.fetchNewsForMain(this.props.lang, this.state.news_quantity)
    }

  componentDidUpdate(prevProps) {

    if (this.props.lang !== prevProps.lang) {
      if (this.props.lang === "en-gb"){
        this.props.fetchMainSlider('W3GV8SQAACQAZAwG', "en-gb")
      } else if(this.props.lang === "ru") {
        this.props.fetchMainSlider('W3GVDyQAACYAZAgb', "ru")
      }
      this.props.fetchMainSciSlider(this.props.lang)
      this.props.fetchNewsForMain(this.props.lang, this.state.news_quantity) 
    }
  }


  render() {

    const { phone, tablet } = this.props
    const { mainSlider, sciSlider, isFetchingMain, isFetchingSci, newsTeaser } = this.props.main

    console.log("main", this.props)
    return (
      <Fragment>
        <section className="main-slider">
          {mainSlider.data && <MainSlider slides={mainSlider.data.body}
                                          isLoading={isFetchingMain}
                                /> }
        </section>

        <section className="news-teaser">
          <div className="container">
            <Link href="/news">
              <a className="main-category">
                {this.context.t("Новости")}
              </a>
            </Link>
            <Link href="/news">
              <a className="main-category-link">
                {this.context.t("смотреть все")}
              </a>
            </Link>
            <div className="columns is-multiline">

              {/* в зависимости от размера окна браузера мы рендерим разные верстки секции с тизерами новостей */}
              {/* вариант смартфона и Ipad */}
              {newsTeaser.articles 
              && <Media query="(max-width: 768px)"
                        render={() => newsTeaser.articles.slice(0,2).map((item, index) =>
                                        <NewscardSmall columns="6" article={item} key={index} />)}
                  />
                
              }
              {/* вариант десктопа */}
              {newsTeaser.articles 
              && <Media query="(min-width: 769px)"
                        render={() => newsTeaser.articles.map((item, index) =>
                                        <NewscardSmall columns="4" article={item} key={index} />)}
                  />
                
              }
            </div>
          </div>
        </section>

        <section className="sci-slider">
          <div className="container">
            <Link href="/research">
              <a className="main-category">
                {this.context.t("Ученые")}
              </a>
            </Link>
            {/* слайдер ученых для десктопа */}
            {sciSlider.length > 0 && <Media query="(min-width: 770px)"
                                            render={() => <SciSlider slides={sciSlider}
                                                                     isLoading={isFetchingSci}
                                                                     desktop
                                                            />}
                                      />}
            {/* слайдер ученых для Ipad */}
            {sciSlider.length > 0 
            &&  <Media query="(min-width: 416px) and (max-width: 769px)"
                        render={() => <SciSlider slides={sciSlider}
                                                 isLoading={isFetchingSci}
                                                 ipad
                                        />
             }
                />
            }
            {/* слайдер ученых для смартфона */}
            {sciSlider.length > 0 
            &&  <Media query="(max-width: 415px)"
                        render={() => <SciSlider slides={sciSlider}
                                                 isLoading={isFetchingSci}
                                                 smartphone
                                        />
             }
                />
            }
          </div>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { main } = state
  const { lang } = state.i18nState
  return { main, lang }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({},
      mainActions,
      langActions,
    ), dispatch);
  }

MainPage.contextTypes = {
  t: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
