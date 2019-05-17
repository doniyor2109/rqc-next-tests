import React, { Fragment } from 'react'
import Slider from "react-slick"
import Media from 'react-media'
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import NextArrow from '../shared/NextArrow';
import PrevArrow from '../shared/PrevArrow';


class Topics extends React.Component {

    state = {
        carouselSettings: {   
          dots: false,
          arrows:true,
          infinite: true,
          speed: 1200,
          adaptiveHeight: false,
          autoplaySpeed: 5000,
          autoplay: false,
          slidesToScroll: 1,
          useTransform: true,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />, 
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

    const { slides, phone, tablet } = this.props

    const slidestoshow = (this.props.slides.length > 3) ? 3 : this.props.slides.length


    const items = slides.map((slide, index) => {
      return (
        <div className="column" key={index} >
          <div className="slide-wrapper">
            <div className={"topic number-" + (index + 1)}>
              <div className="topic-head">
                {RichText.render(slide.research_topic, PrismicConfig.linkResolver)}‘
              </div>
              <div className="topic-list">
                {RichText.render(slide.topics_list, PrismicConfig.linkResolver)}
              </div>
            </div>
          </div>
        </div>
      )
    })
  
    return (
      <Fragment>
        <Media query="(min-width: 769px)"
                       defaultMatches={phone === null}
                       render={() =>  <div id="carousel">
                                        <Slider {...{slidesToShow : slidestoshow, ...this.state.carouselSettings}}>
                                            {items}
                                        </Slider>
                                      </div>
                              }
        />
         <Media query="(min-width: 416px) and (max-width:768px)"
                       defaultMatches={tablet !== null}
                       render={() =>  <div id="carousel">
                                        <Slider {...{slidesToShow : 2, ...this.state.carouselSettings}}>
                                            {items}
                                        </Slider>
                                      </div>
                              }
        />
        <Media query="(max-width: 415px)"
                       defaultMatches={phone !== null}
                       render={() =>  <div id="carousel">
                                        <Slider {...{slidesToShow : 1, ...this.state.carouselSettings}}>
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

export default Topics
