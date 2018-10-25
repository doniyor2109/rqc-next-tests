import React from 'react'
import Slider from "react-slick"
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import moment from 'moment'
import 'moment/locale/ru'


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
                          infinite: true,
                          speed: 700,
                          adaptiveHeight: false,
                          autoplaySpeed: 2000,
                          autoplay: true,
                          lazyLoad: 'progressive',
                          slidesToShow: 6,
                          slidesToScroll: 1,
                          useTransform: true }}>
            {items}
        </Slider>
    )
  }
}

export default Milestones
