import React, {Fragment} from 'react'
import Slider from "react-slick"
import { Link, RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import { Button } from '../shared/Button'
import { Loading } from '../shared/loading.js'
import Media from 'react-media'

class MainSlider extends React.Component {

  state = {
    carouselSettings: {
      dots: true,
      infinite: true,
      speed: 1200,
      adaptiveHeight: false,
      autoplaySpeed: 5000,
      autoplay: true,
      lazyLoad: 'progressive',
      slidesToShow: 1,
      slidesToScroll: 1,
      useTransform: true, 
      useCSS: true, 
      easing: 'easeInQuart', 
      swipeToSlide: true,
      swipe: true,
      touchThreshold: 5
      }
  }

  constructor(props) {
    super(props);
    this.preventTouch = this.preventTouch.bind(this);
    this.touchStart = this.touchStart.bind(this);
  }

  componentDidMount() {
    // Disable touchmove to prevent scrolling entire page
    const carousel = document.getElementById('carousel'); // Your site element containing react-slick's carousel-container
    carousel.addEventListener('touchstart', this.touchStart);
    carousel.addEventListener('touchmove', this.preventTouch, { passive: false });
  }

  render() {

    const { slides, isLoading, phone, tablet } = this.props
    const items = slides.map((slide, index) => {
      const back = phone 
      ? {background: "url(" + slide.primary.image_slide.iphone.url +  ")", backgroundSize:"cover"}
      : (tablet 
        ? {background: "url(" + slide.primary.image_slide.ipad.url +  ")", backgroundSize:"cover"}
        : {background: "url(" + slide.primary.image_slide.url +  ")", backgroundSize:"cover"}
        )      
      return (
        <div key={index}>
          <div className="sl" style={back}>
            <div className="container">
              <div className="columns">
                <div className="column is-6-desktop is-offset-1-desktop column is-10-tablet is-offset-2-tablet is-12-mobile" >
                  {RichText.render(slide.primary.title_slideh2, PrismicConfig.linkResolver)}
                  {RichText.render(slide.primary.title_slideh1, PrismicConfig.linkResolver)}
                  {RichText.render(slide.primary.description_slide, PrismicConfig.linkResolver)}
                  <Button text={slide.primary.button_text_slide}
                          url={Link.url(slide.primary.button_url_slide, PrismicConfig.linkResolver)}
                          color="ffffff"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    )
    if (isLoading) return <Loading />
    else return (
        <Fragment>

            <Media query="(min-width: 769px)"
                   defaultMatches={phone === null && tablet === null}
                   render={() => <div id="carousel">
                                    <Slider {...this.state.carouselSettings}>
                                        {items}
                                  </Slider>     
                                 </div>
                          }
            />
            <Media query="(min-width: 416px) and (max-width: 768px)"
                   defaultMatches={tablet !== null}
                   render={() => <div id="carousel">
                                    <Slider {...this.state.carouselSettings}>
                                      {items}
                                    </Slider>     
                                </div>
                          }
            />
            <Media query="(max-width: 415px)"
                   defaultMatches={phone !== null}
                   render={() => <div id="carousel">
                                    <Slider {...this.state.carouselSettings}>
                                      {items}
                                    </Slider>     
                                </div>
                          }
            />

        </Fragment>
          )
  }
  touchStart(e) {
    // capture user's starting finger position, for later comparison
    this.firstClientX = e.touches[0].clientX;
  }
  preventTouch(e) {
    // only prevent touch on horizontal scroll (for horizontal carousel)
    // this allows the users to scroll vertically past the carousel when touching the carousel
    // this also stabilizes the horizontal scroll somewhat, decreasing vertical scroll while horizontal scrolling
    const clientX = e.touches[0].clientX - this.firstClientX;
    const horizontalScroll = Math.abs(clientX) > this.state.carouselSettings.touchThreshold;
    if (horizontalScroll) {
      e.preventDefault();
    }
  }
}

export default MainSlider
