import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styled from 'styled-components';

const Styled = styled.section`
  .slick-prev, .slick-next  {
    z-index: 3;
    background: #009ee2;
    width: 5rem;
    height: 5rem;
    text-align: center;
    padding: 1.5rem 1rem 1.5rem 0.7rem;
    }
    .slick-prev {
      &::before{
          content:"";
      }
      left:3rem;
    } 
    .slick-next {
      &::before{
          content:"";
      }
      padding: 1.5rem 1rem 1.5rem 1.5rem;
      right:3rem;
    }

    @media (max-width:415px) {
      .slick-prev {
        width: 4rem;
        height: 4rem;
        padding: 1rem 0.5rem 1rem 0.3rem;
      }

      .slick-next {
        width: 4rem;
        height: 4rem;
        padding: 1rem 0.3rem 1rem 0.5rem;            
      }
    }
`;

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} role="button" tabIndex={0}>
      <img src="/static/image_slider_arrow_right.svg" alt="Arrow Next Slide" />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} role="button" tabIndex={0}>
      <img src="/static/image_slider_arrow_left.svg" alt="Arrow Previous Slide" />
    </div>
  );
}

class ImageSlider extends React.Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
      labimage: PropTypes.shape({
        dimensions: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
        url: PropTypes.string,
        photo_title: PropTypes.arrayOf(PropTypes.string),
      }),
    })),
    phone: PropTypes.string,
  }

  static defaultProps = {
    slides: [],
    phone: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      carouselSettings: {
        dots: false,
        infinite: true,
        speed: 1200,
        adaptiveHeight: false,
        autoplaySpeed: 5000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        useTransform: false,
        useCSS: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
    };
    this.preventTouch = this.preventTouch.bind(this);
    this.touchStart = this.touchStart.bind(this);
  }

  componentDidMount() {
    // Disable touchmove to prevent scrolling entire page
    const carousel = document.getElementById('carousel'); // Your site element containing react-slick's carousel-container
    carousel.addEventListener('touchstart', this.touchStart);
    carousel.addEventListener('touchmove', this.preventTouch, { passive: false });
  }

  touchStart(e) {
    // capture user's starting finger position, for later comparison
    this.firstClientX = e.touches[0].clientX;
  }

  preventTouch(e) {
    // only prevent touch on horizontal scroll (for horizontal carousel)
    // this allows the users to scroll vertically past the carousel when touching the carousel
    // this also stabilizes the horizontal scroll somewhat,
    // decreasing vertical scroll while horizontal scrolling
    const { carouselSettings } = this.state;
    const clientX = e.touches[0].clientX - this.firstClientX;
    const horizontalScroll = Math.abs(clientX) > carouselSettings.touchThreshold;
    if (horizontalScroll) {
      e.preventDefault();
    }
  }

  render() {
    const { slides, phone } = this.props;
    const { carouselSettings } = this.state;
    const items = slides.map(slide => (
      <div className="lab-gallery" key={slide.labimage.url}>
        <img
          src={phone === null ? slide.labimage.url : slide.labimage.mobile.url}
          alt={slide.labimage.alt}
        />
      </div>
    ));

    return (
      <Styled>
        <div id="carousel">
          <Slider {...carouselSettings}>
            {items}
          </Slider>
        </div>
      </Styled>
    );
  }
}

export default ImageSlider;
