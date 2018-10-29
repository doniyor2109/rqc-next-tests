import React from 'react'
import PropTypes from 'prop-types'

import Popup from '../shared/Popup'
import Slider from "react-slick"
import Socials from '../shared/Socials'

import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import hostName from '../../host'

function NextSciArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <img src="/static/photo_slider_arrow_right.svg" alt="Arrow Next Slide"/>
      </div>
    )
  }
  
  function PrevSciArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
          <img src="/static/photo_slider_arrow_left.svg" alt="Arrow Previous Slide"/>
        </div>
      )
  }
  

class PhotoPopup extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }  

    state = {
        slide: this.props.i
    }

    goTo = (index) => {
        this.slider.slickGoTo(index, 'dontAnimate');
    }

    componentDidMount() {

        // при загрузке попапа отпрявляяем слайдер сразу на то фото, 
        // на которое кликнул пользователь

        this.goTo(this.props.i)
    }

    render() {

        const {item, photo_set, active, close} = this.props

        // console.log("popup " + this.props.i, this.props)
        // console.log("slide title", photo_set[this.state.slide].photo_title)

        if (item) { 
            return (
            <Popup active={active} close={close}>
                <Slider ref={c => (this.slider = c)} {...  { dots: false,
                                arrows: true,
                                infinite: true,
                                speed: 300,
                                adaptiveHeight: false,
                                autoplaySpeed: 3000,
                                autoplay: false,
                                lazyLoad: 'progressive',
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                useTransform: true, 
                                useCSS: true, 
                                easing: 'easeInQuart', 
                                swipeToSlide: true,
                                swipe: true,
                                touchThreshold: 5, 
                                nextArrow: <NextSciArrow />,
                                prevArrow: <PrevSciArrow />, 
                                beforeChange: (current, next) => this.setState({ slide: next })
                                }}>
                    {photo_set.map((item, index) => 
                        <div key={index}>
                            <div className="photo_wrapper">
                                <img src={item.photo.url} alt={item.photo.alt} />
                            </div>
                        </div>
                    )}
                </Slider>   

                <div className="photo-meta">
                    <hr />
                    <p className="count">{this.state.slide + 1} / {this.props.photo_set.length}</p>
                    <div className="title_download">
                        {photo_set.length > 0 && RichText.render(photo_set[this.state.slide].photo_title, PrismicConfig.linkResolver)}
                        <a href={item.photo.url} download>
                            <button className="download" title={this.context.t("Скачать фото")}/>
                        </a>
                    </div>
                    <Socials url={hostName + "/photo/" + this.props.uid} 
                           quote={this.props.gallery_title}
                           image={this.props.photo_set[0].photo.url}
                    />   
                </div>

            </Popup>
            )
        }
    }
}

export default PhotoPopup