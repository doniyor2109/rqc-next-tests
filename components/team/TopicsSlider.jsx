import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Media from 'react-media';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import NextArrow from '../shared/NextArrow';
import PrevArrow from '../shared/PrevArrow';

const TopicsStyled = styled.section`
  .column {
    margin: 0;
    display: flex;
    height:100%;
    &:focus {
        outline: 0;
    }
  }
  .slick-list {
    margin: 0 0 0 -1.5rem;
  }

  .slick-track {
    display: flex;
  }

  .slick-slide {
    display: flex;
    height: auto;
  }

  .slick-prev {
    left: -4.5rem;
  }

  .slick-next {
    right: -3.5rem;
  }

  @media (min-width: 416px) and (max-width:768px){
    .slick-next {
      right: -3rem;
    }
    .slick-prev {
      left: -3rem;
    }
  }
  @media (max-width:415px) {
    .slick-list {
      margin: 0;
    }
    .column {
      padding: 2px;
      height: auto;
    }
    .topic-head h4 {
      padding-right: 0;
    }

    .slick-prev, .slick-next {
      top: 1rem;
    }
    .slick-next {
      right: -8px;
    }
    .slick-prev {
      left: 0;
    }
  }
  .slide-wrapper {
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 4.5rem 2.5rem;
    height: 100%;
    @media (max-width: 415px) {
      margin-top: 5rem;
    }
  
    &:focus {
      outline: 0;
    }
    .topic {
      display: flex;
      flex-direction: column;
      min-height: 17rem;
      height:100%;
      position: relative;
  
      &::before {
        position: absolute;
        font-size: 20rem;
        bottom: 0;
        display: flex;
        align-self: flex-end;
        line-height: 17rem;
        font-weight: 900;
        color: rgba(4,3,3,0.2);
      }
      &.number-1::before {
        content: "1";
      }
  
      &.number-2::before {
        content: "2";
      }
      &.number-3::before {
        content: "3";
      }
      &.number-4::before {
        content: "4";
      }
      &.number-5::before {
        content: "5";
      }
      &.number-6::before {
        content: "6";
      }
      &.number-7::before {
        content: "7";
      }
      &.number-8::before {
        content: "8";
      }
      &.number-9::before {
        content: "9";
      }
      .topic-head {
        display: flex;
        h4 {
          font-size: 2.2rem;
          line-height: 3rem;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 3.5rem;
          padding-right: 3rem;
        }
      }
      .topic-list {
        ul {
          padding-right: 2rem;
          li {
            font-size: 1.6rem;
            line-height: 1.2;
            margin-bottom: 1rem;
            &::before {
              content: '\\25E6'; 
              color:#009ee2;
              margin: 0 2rem 0 0;
            } 
          }
        }
      }
    }
  }
`;

class TopicsSlider extends React.Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
      research_topic: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      topics_list: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    })),
    phone: PropTypes.string,
    tablet: PropTypes.string,
  }

  static defaultProps = {
    slides: [],
    phone: null,
    tablet: null,
  }

  state = {
    carouselSettings: {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 1200,
      adaptiveHeight: false,
      autoplaySpeed: 5000,
      autoplay: false,
      slidesToScroll: 1,
      useTransform: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
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
    const { slides, phone, tablet } = this.props;

    const slidestoshow = (slides.length > 3) ? 3 : slides.length;


    const items = slides.map((slide, index) => (
      <div className="column" key={slide.research_topic[0].text}>
        <div className="slide-wrapper">
          <div className={`topic number-${index + 1}`}>
            <div className="topic-head">
              {RichText.render(slide.research_topic, PrismicConfig.linkResolver)}
            </div>
            <div className="topic-list">
              {RichText.render(slide.topics_list, PrismicConfig.linkResolver)}
            </div>
          </div>
        </div>
      </div>
    ));

    const { carouselSettings } = this.state;

    return (
      <TopicsStyled>
        <Media
          query="(min-width: 769px)"
          defaultMatches={phone === null}
          render={() => (
            <div id="carousel" style={{ clear: 'both' }}>
              <Slider {...{ slidesToShow: slidestoshow, ...carouselSettings }}>
                {items}
              </Slider>
            </div>
          )
          }
        />
        <Media
          query="(min-width: 416px) and (max-width:768px)"
          defaultMatches={tablet !== null}
          render={() => (
            <div id="carousel" style={{ clear: 'both' }}>
              <Slider {...{ slidesToShow: 2, ...carouselSettings }}>
                {items}
              </Slider>
            </div>
          )
          }
        />
        <Media
          query="(max-width: 415px)"
          defaultMatches={phone !== null}
          render={() => (
            <div id="carousel" style={{ clear: 'both' }}>
              <Slider {...{ slidesToShow: 1, ...carouselSettings }}>
                {items}
              </Slider>
            </div>
          )
          }
        />
      </TopicsStyled>
    );
  }
}

export default TopicsSlider;
