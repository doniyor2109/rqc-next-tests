import React from 'react'
import Slider from "react-slick"

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img src="/static/image_slider_arrow_right.svg" alt="Arrow Next Slide"/>
    </div>
  )
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
      <div className={className} onClick={onClick}>
        <img src="/static/image_slider_arrow_left.svg" alt="Arrow Previous Slide"/>
      </div>
    )
}

class LabImage extends React.Component {

  state = {
    carouselSettings: {
      dots: false,
      infinite: true,
      speed: 2000,
      adaptiveHeight: false,
      autoplaySpeed: 4500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      useTransform: false,
      useCSS: true, 
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
          <div className="lab-gallery" key={index}>
            <img src={phone === null ? slide.labimage.url : slide.labimage.mobile.url } alt={slide.labimage.alt} />
          </div>
      )
    })
  
    return (

        <div id="carousel">
          <Slider {...this.state.carouselSettings}>
            {items}
          </Slider>
        </div>        
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

export default LabImage
