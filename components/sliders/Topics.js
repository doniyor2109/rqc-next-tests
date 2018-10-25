import React from 'react'
import Slider from "react-slick"
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'



class Topics extends React.Component {


  render() {

    const { slides } = this.props

    const slidestoshow = (slides.length > 3) ? 3 : slides.length

    const items = slides.map((slide, index) => {
      return (
        <div key={index} className="column is-4">
          <div className={"topic number-" + (index + 1)}>
            <div className="topic-head">
              {RichText.render(slide.research_topic, PrismicConfig.linkResolver)}‘
            </div>
            <div className="topic-list">
              {RichText.render(slide.topics_list, PrismicConfig.linkResolver)}
            </div>
          </div>
        </div>
      )
    })
  
    return (
        <Slider {...  {   dots: false,
                          infinite: true,
                          speed: 1500,
                          adaptiveHeight: false,
                          autoplaySpeed: 2000,
                          autoplay: true,
                          lazyLoad: 'progressive',
                          slidesToShow: slidestoshow,
                          slidesToScroll: 1,
                          useTransform: true }}>
          {items}
        </Slider>
    )
  }
}

export default Topics
