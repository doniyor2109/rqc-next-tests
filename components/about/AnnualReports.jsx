import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link, RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

const AnnualReports = ({ slides }) => {
  const items = slides.map((slide) => {
    const back = { background: `url(${slide.wallpaper.url})`, backgroundSize: 'cover' };
    return (
      <Link href="/reports" key={slide.heading[0].text}>
        <a>
          <div className="report-slide" style={back}>
            {RichText.render(slide.heading, PrismicConfig.linkResolver)}
            <ArrowButton
              url={Link.url(slide.report_url, PrismicConfig.linkResolver)}
              color="ffffff"
              target_blank
            />
          </div>
        </a>
      </Link>
    );
  });

  return (
    <Slider {...{
      dots: false,
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
      prevArrow: <PrevArrow />,
    }}
    >
      {items}
    </Slider>
  );
};

AnnualReports.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
  })),
};

AnnualReports.defaultProps = {
  slides: [],
};

export default AnnualReports;
