import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Link, RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import { Button } from '../shared/Button'
import SliderSection from './styled/SliderSection'
import MainSlide from './styled/MainSlide'

class MainSlider extends React.Component {
  static propTypes = {
    phone: PropTypes.string,
    tablet: PropTypes.string,
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        primary: PropTypes.shape({
          button_text_slide: PropTypes.string,
          button_url_slide: PropTypes.shape({
            url: PropTypes.string,
          }),
          description_slide: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string,
            })
          ),
          title_slideh1: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string,
            })
          ),
          title_slideh2: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string,
            })
          ),
          image_slide: PropTypes.shape({
            url: PropTypes.string,
            iphone: PropTypes.shape({
              url: PropTypes.string,
            }),
            ipad: PropTypes.shape({
              url: PropTypes.string,
            }),
          }),
        }),
      })
    ),
  }

  static defaultProps = {
    phone: null,
    tablet: null,
    slides: [],
  }

  constructor(props) {
    super(props)
    this.preventTouch = this.preventTouch.bind(this)
    this.touchStart = this.touchStart.bind(this)
    this.state = {
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
        touchThreshold: 5,
      },
    }
  }

  componentDidMount() {
    // Disable touchmove to prevent scrolling entire page
    const carousel = document.getElementById('carousel') // Your site element containing react-slick's carousel-container
    carousel.addEventListener('touchstart', this.touchStart)
    carousel.addEventListener('touchmove', this.preventTouch, {
      passive: false,
    })
  }

  touchStart(e) {
    // capture user's starting finger position, for later comparison
    this.firstClientX = e.touches[0].clientX
  }

  preventTouch(e) {
    // only prevent touch on horizontal scroll (for horizontal carousel)
    // this allows the users to scroll vertically past the carousel when touching the carousel
    // this also stabilizes the horizontal scroll somewhat,
    // decreasing vertical scroll while horizontal scrolling
    const { carouselSettings } = this.state
    const clientX = e.touches[0].clientX - this.firstClientX
    const horizontalScroll = Math.abs(clientX) > carouselSettings.touchThreshold
    if (horizontalScroll) {
      e.preventDefault()
    }
  }

  render() {
    const { slides } = this.props
    const { carouselSettings } = this.state

    // items for slider
    const items = slides.map(slide => (
      <MainSlide
        key={slide.primary.title_slideh1[0].text}
        back={slide.primary.image_slide}
      >
        <div className="sl">
          <div className="container">
            <div className="columns">
              <div className="column is-8-desktop is-offset-1-desktop column is-10-tablet is-offset-2-tablet is-12-mobile">
                {RichText.render(
                  slide.primary.title_slideh2,
                  PrismicConfig.linkResolver
                )}
                {RichText.render(
                  slide.primary.title_slideh1,
                  PrismicConfig.linkResolver
                )}
                {RichText.render(
                  slide.primary.description_slide,
                  PrismicConfig.linkResolver
                )}
                <Button
                  text={slide.primary.button_text_slide}
                  url={Link.url(
                    slide.primary.button_url_slide,
                    PrismicConfig.linkResolver
                  )}
                  color="ffffff"
                />
              </div>
            </div>
          </div>
        </div>
      </MainSlide>
    ))

    return (
      <SliderSection>
        <div id="carousel">
          <Slider {...carouselSettings}>{items}</Slider>
        </div>
      </SliderSection>
    )
  }
}

export default MainSlider
