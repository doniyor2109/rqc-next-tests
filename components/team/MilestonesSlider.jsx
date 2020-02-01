import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'react-slick'
import Media from 'react-media'
import { RichText } from 'prismic-reactjs'
import moment from 'moment'
import PrismicConfig from '../../prismic-configuration'
import 'moment/locale/ru'
import NextArrow from '../shared/NextArrow'
import PrevArrow from '../shared/PrevArrow'

const Styled = styled.div`
  .column {
    padding: 0;
    margin: 0;
    display: flex;
    height: 100%;
    @media (max-width: 415px) {
      margin-top: 5rem;
    }
  }
  .slick-track {
    display: flex;
  }
  .slick-slide {
    display: flex;
    height: auto;
  }
  .slick-slide > div {
    width: 100%;
  }
  .slick-prev {
    left: -4.5rem;
    &:before {
      content: '';
    }
  }
  .slick-next {
    right: -4.5rem;
    &:before {
      content: '';
    }
  }

  @media (min-width: 416px) and (max-width: 768px) {
    .slick-next {
      right: -3rem;
    }
    .slick-prev {
      left: -3rem;
    }
  }

  @media (max-width: 415px) {
    .slick-prev,
    .slick-next {
      top: 1rem;
    }
    .slick-next {
      right: -1rem;
    }
    .slick-prev {
      left: 0;
    }
  }

  .milestone {
    font-family: 'DIN Pro', sans-serif;
    font-size: 1.4rem;
    color: black;
    position: relative;
    padding-right: 2rem;
    height: 100%;
    @media (max-width: 415px) {
      height: auto;
    }
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 2px solid #009ee2;
    line-height: 1.8rem;

    p {
      display: inline;
      font-weight: bold;
      color: #040303;
    }

    div > h6 {
      flex-grow: 1;
      margin-top: 2rem;
    }
    .vertical_line {
      border-left: 1px solid rgba(0, 0, 0, 0.2);
      margin: 1rem 0 0 1.5rem;
      min-height: 4rem;
      height: 100%;
      overflow-y: hidden;
    }
    .milestone_dot {
      position: absolute;
      bottom: -5px;
      left: 1rem;
      margin-top: 1rem;
      overflow: visible;
    }
    border-bottom: 2px solid #009ee2;
  }
`

class Milestones extends React.Component {
  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        milestone: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
          })
        ),
      })
    ),
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
      autoplay: true,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    },
  }

  constructor(props) {
    super(props)
    this.preventTouch = this.preventTouch.bind(this)
    this.touchStart = this.touchStart.bind(this)
  }

  componentDidMount() {
    // Disable touchmove to prevent scrolling entire page
    const carousel = document.getElementById('carousel') // Your site element containing react-slick's carousel-container
    carousel.addEventListener('touchstart', this.touchStart)
    carousel.addEventListener('touchmove', this.preventTouch, {
      passive: false,
    })
    if (this.props.lang === 'ru') {
      moment.locale('ru')
    } else moment.locale('en')
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
    const { slides, phone, tablet } = this.props
    const { carouselSettings } = this.state
    const items = slides.map(slide => (
      <div key={slide.milestone[0].text} className="column is-2-desktop">
        <div className="milestone">
          <p>
            <span className="month">
              {moment(slide.date).format('MMMM')}
              &nbsp;
            </span>
            <span className="year">{moment(slide.date).format('YYYY')}</span>
          </p>
          {RichText.render(slide.milestone, PrismicConfig.linkResolver)}
          <div className="vertical_line" />
          <img
            src="/static/milestone_dot.svg"
            className="milestone_dot"
            alt=""
          />
        </div>
      </div>
    ))

    return (
      <Styled>
        <Media
          query="(min-width: 769px)"
          defaultMatches={phone === null}
          render={() => (
            <div id="carousel" style={{ clear: 'both' }}>
              <Slider {...{ slidesToShow: 6, ...carouselSettings }}>
                {items}
              </Slider>
            </div>
          )}
        />
        <Media
          query="(min-width: 416px) and (max-width:768px)"
          defaultMatches={tablet !== null}
          render={() => (
            <div id="carousel" style={{ clear: 'both' }}>
              <Slider {...{ slidesToShow: 3, ...carouselSettings }}>
                {items}
              </Slider>
            </div>
          )}
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
          )}
        />
      </Styled>
    )
  }
}

export default Milestones
