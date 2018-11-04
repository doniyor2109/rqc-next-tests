import React, { Fragment } from 'react'
import Slider from "react-slick"
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import moment from 'moment'
import 'moment/locale/ru'


function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img src="/static/sci_slider_arrow_right.svg" alt="Arrow Next Slide"/>
    </div>
  )
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
      <div className={className} onClick={onClick}>
        <img src="/static/sci_slider_arrow_left.svg" alt="Arrow Previous Slide"/>
      </div>
    )
}

class Milestones extends React.Component {

  state = {
    carouselSettings: {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 700,
      adaptiveHeight: false,
      autoplaySpeed: 2000,
      autoplay: true,
      lazyLoad: 'progressive',
      slidesToScroll: 1,
      useTransform: true, 
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
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

    const { slides, phone } = this.props

    const items = slides.map((slide, index) => {
      return (
        <div key={index} className="column is-2-desktop">
          <div className="milestone">
          <p>
            <span className="month">{moment(slide.date).format('MMMM')}&nbsp;</span>
            <span className="year">{moment(slide.date).format('YYYY')}</span>
          </p>
            {RichText.render(slide.milestone, PrismicConfig.linkResolver)}
            <div className="vertical_line"></div>
            <img src="/static/milestone_dot.svg" className="milestone_dot" alt=""/>
          </div>
        </div>
      )
    })
  
    return (
      <Fragment>
        {phone === null &&  
          <div id="carousel">
            <Slider {...  {slidesToShow: 6, ...this.state.carouselSettings}}>
                {items}
            </Slider>
          </div>
        }
        {phone !== null &&  
          <div id="carousel">
            <Slider {...  {slidesToShow: 1, ...this.state.carouselSettings}}>
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

export default Milestones
