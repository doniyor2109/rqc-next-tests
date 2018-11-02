import React from 'react'
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


  render() {

    const { slides } = this.props

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
        <Slider {...  {   dots: false,
                          arrows: true,
                          infinite: true,
                          speed: 700,
                          adaptiveHeight: false,
                          autoplaySpeed: 2000,
                          autoplay: true,
                          lazyLoad: 'progressive',
                          slidesToShow: 6,
                          slidesToScroll: 1,
                          useTransform: true, 
                          nextArrow: <NextArrow />,
                          prevArrow: <PrevArrow /> }}>
            {items}
        </Slider>
    )
  }
}

export default Milestones
