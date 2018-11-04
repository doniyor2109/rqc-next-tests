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


  render() {

    const { slides } = this.props
    console.log("labimage", this.props)

    const items = slides.map((slide, index) => {
      return (
          <div className="lab-gallery" key={index}>
            <img src={slide.labimage.url} alt=""/>
          </div>
      )
    })
  
    return (
        <Slider {...  {   dots: false,
                          infinite: true,
                          speed: 2000,
                          adaptiveHeight: false,
                          autoplaySpeed: 3000,
                          autoplay: true,
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          useTransform: false,
                          useCSS: true, 
                          nextArrow: <NextArrow />,
                          prevArrow: <PrevArrow /> }}>
          {items}
        </Slider>
    )
  }
}

export default LabImage
