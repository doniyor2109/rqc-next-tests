import React from 'react'
import Slider from "react-slick"
import { Link, RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import ArrowButton from '../shared/ArrowButton'
import NextArrow from '../shared/NextArrow';
import PrevArrow from '../shared/PrevArrow';

class AnnualReports extends React.Component {

  render() {

    const { slides } = this.props

    const items = slides.map((slide, index) => {
      const back = {background: "url(" + slide.wallpaper.url + ")", backgroundSize:"cover"}
      return (
        <div key={index}> 
          <div className="report-slide" style={back}>
            {RichText.render(slide.heading, PrismicConfig.linkResolver)}
            <ArrowButton url={Link.url(slide.report_url, PrismicConfig.linkResolver)}
                         color="ffffff"
                         target_blank
            />
          </div>
        </div>

    )}

    )

  return (
            <Slider {...{   dots: false,
                          arrows: true, 
                          infinite: true,
                          speed: 700,
                          adaptiveHeight: true,
                          autoplaySpeed: 3000,
                          autoplay: false,
                          lazyLoad: 'ondemand',
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          useTransform: false,
                          nextArrow: <NextArrow />,
                          prevArrow: <PrevArrow /> }}>
              {items}
            </Slider>
          )
  }
}

export default AnnualReports
