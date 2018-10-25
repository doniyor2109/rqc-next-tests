import React from 'react'
import Slider from "react-slick"
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration'
import { Loading } from '../shared/loading'


// СЕЙЧАС НЕ ИСПОЛЬЗУЕТСЯ - УДАЛИТЬ!!!
class TeamSlider extends React.Component {

  render() {

    const { members, options, isLoading } = this.props

    const items = members.map((member, index) => {
      return (
        <div key={index} className="column">
          <img src={member.member_photo.url} alt={member.name}/>
          <div className="team-title">
            {RichText.render(member.name, PrismicConfig.linkResolver)}
          </div>
          {RichText.render(member.position, PrismicConfig.linkResolver)}
        </div>
      )
    })
    if (isLoading) return <Loading />
    else return (
        <Slider {...{   dots: false,
                        infinite: true,
                        speed: 700,
                        adaptiveHeight: false,
                        autoplaySpeed: 3000,
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

export default TeamSlider
