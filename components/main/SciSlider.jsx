import React, { Fragment } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import NextArrow from '../shared/NextArrow';
import PrevArrow from '../shared/PrevArrow';
import Scientist from './styled/Scientist';

class SciSlider extends React.Component {
  static propTypes = {
    iphone: PropTypes.bool,
    ipad: PropTypes.bool,
    desktop: PropTypes.bool,
    slides: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.shape({
        position: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        name: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        photo: PropTypes.shape({
          url: PropTypes.string,
        }),
        science_group: PropTypes.shape({
          data: PropTypes.shape({
            groupname: PropTypes.arrayOf(PropTypes.shape({
              text: PropTypes.string,
            })),
          }),
          uid: PropTypes.string,
        }),
      }),
    })),
  }

  static defaultProps = {
    iphone: false,
    ipad: false,
    desktop: false,
    slides: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      carouselSettings: {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1200,
        adaptiveHeight: false,
        autoplaySpeed: 5000,
        autoplay: true,
        lazyLoad: 'progressive',
        slidesToScroll: 1,
        useTransform: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        easing: 'easeInQuart',
        swipeToSlide: true,
        swipe: true,
        touchThreshold: 5,
      },
    };
    this.preventTouch = this.preventTouch.bind(this);
    this.touchStart = this.touchStart.bind(this);
  }

  componentDidMount() {
    // Disable touchmove to prevent scrolling entire page
    const carousel = document.getElementById('scientists-carousel'); // Your site element containing react-slick's carousel-container
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
    const {
      slides, desktop, ipad, iphone,
    } = this.props;

    const { t } = this.context;

    const { carouselSettings } = this.state;

    // готовим items для слайдера
    const items = slides.map(slide => (
      <div key={slide.data.photo.url} className="column">
        <Scientist>
          <img src={slide.data.photo.url} alt={slide.data.name} />
          <div className="sci-title">
            {RichText.render(slide.data.name, PrismicConfig.linkResolver)}
          </div>
          <div className="sci-group">
            {t('Группа')}
            :
            {' '}
            <br />
            <Link href={`/team?uid=${slide.data.science_group.uid}`} as={`/team/${slide.data.science_group.uid}`}>
              <a className="group-name">
                {slide.data.science_group.data
                  && RichText.render(slide.data.science_group.data.groupname,
                    PrismicConfig.linkResolver)}
              </a>
            </Link>
          </div>
          {RichText.render(slide.data.position, PrismicConfig.linkResolver)}
        </Scientist>
      </div>
    ));

    return (
      <Fragment>
        {desktop
          && (
          <div id="scientists-carousel">
            <Slider {...{ slidesToShow: 6, ...carouselSettings }}>
              {items}
            </Slider>
          </div>
          )}
        {ipad
          && (
          <div id="scientists-carousel">
            <Slider {...{ slidesToShow: 3, ...carouselSettings }}>
              {items}
            </Slider>
          </div>
          )}
        {iphone
          && (
          <div id="scientists-carousel">
            <Slider {...{ slidesToShow: 2, ...carouselSettings }}>
              {items}
            </Slider>
          </div>
          )}
      </Fragment>
    );
  }
}

SciSlider.contextTypes = {
  t: PropTypes.func,
};

export default SciSlider;
