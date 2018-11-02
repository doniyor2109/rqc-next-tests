import React, {Fragment} from 'react'
import Link from 'next/link'
import Slider from "react-slick"
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'

function NextSciArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img src="/static/sci_slider_arrow_right.svg" alt="Arrow Next Slide"/>
    </div>
  )
}

function PrevSciArrow(props) {
  const { className, onClick } = props;
  return (
      <div className={className} onClick={onClick}>
        <img src="/static/sci_slider_arrow_left.svg" alt="Arrow Previous Slide"/>
      </div>
    )
}


class SciSlider extends React.Component {

  state = {
    carouselSettings: {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      adaptiveHeight: false,
      autoplaySpeed: 3000,
      autoplay: true,
      lazyLoad: 'progressive',
      slidesToScroll: 1,
      useTransform: true,
      nextArrow: <NextSciArrow />,
      prevArrow: <PrevSciArrow />,
      easing: 'easeInQuart', 
      swipeToSlide: true,
      swipe: true,
      touchThreshold: 5, 
      }, 
      ipadSettings: {
        slidesToShow: 3
      }, 
      mobileSettings: {
        slidesToShow: 2
      }, 
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

    const { slides, ipad, smartphone, desktop } = this.props

    const items = slides.map((slide, index) => {
      return (
        <div key={index} className="column">
          <img src={slide.data.photo.url} alt={slide.data.name}/>
          <div className="sci-title">
            {RichText.render(slide.data.name, PrismicConfig.linkResolver)}
          </div>
          <div className="sci-group">
          {this.context.t("Группа:")} <br />
          <Link href={'/team?uid=' + slide.data.science_group.uid} as={'/team/' + slide.data.science_group.uid}>
            <a className="group-name">
              {slide.data.science_group.data && RichText.render(slide.data.science_group.data.groupname, PrismicConfig.linkResolver)}
            </a>
          </Link>
          </div>
          {RichText.render(slide.data.position, PrismicConfig.linkResolver)}
        </div>
      )
    })
    return (
        <Fragment>
          {desktop && <div id="carousel">
                        <Slider {...{dots: false,
                            arrows: true,
                            infinite: true,
                            speed: 700,
                            adaptiveHeight: false,
                            autoplaySpeed: 3000,
                            autoplay: true,
                            lazyLoad: 'progressive',
                            slidesToShow: 6,
                            slidesToScroll: 1,
                            useTransform: true,
                            nextArrow: <NextSciArrow />,
                            prevArrow: <PrevSciArrow /> }}>
                          {items}
                        </Slider>
                      </div>
          }
          {ipad && <div id="carousel">
                    <Slider {...{slidesToShow : 3, ...this.state.carouselSettings}}>
                      {items}
                    </Slider>

                  </div>
          }
          {smartphone && <div id="carousel">
                          <Slider {...{slidesToShow : 2, ...this.state.carouselSettings}}>
                            {items}
                          </Slider>
                        </div>
          
          }


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

SciSlider.contextTypes = {
  t: PropTypes.func
}

export default SciSlider
