import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Slider from 'react-slick';
import { RichText } from 'prismic-reactjs';
import Popup from '../shared/Popup';
import Socials from '../shared/Socials';
import PhotoType from './PhotoPropType';

import PrismicConfig from '../../prismic-configuration';
import hostName from '../../host';
import NextArrow from '../shared/NextArrow';
import PrevArrow from '../shared/PrevArrow';

const propTypes = {
  item: PropTypes.shape(PhotoType),
  active: PropTypes.bool,
  close: PropTypes.func.isRequired,
  gallery_title: PropTypes.string,
  uid: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  photo_set: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.shape({
      dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
      url: PropTypes.string,
      photo_title: PropTypes.arrayOf(PropTypes.string),
    }),
  })),
  className: PropTypes.string,
};

const defaultProps = {
  item: {},
  active: false,
  gallery_title: '',
  className: '',
  photo_set: PropTypes.arrayOf(PropTypes.shape({
    photo: PropTypes.shape({
      dimensions: PropTypes.shape({
        width: 730,
        height: 490,
      }),
      url: '',
    }),
  })),
};

// Main Class
class PhotoPopup extends React.Component {
    static contextTypes = {
      t: PropTypes.func,
    }

    constructor(props) {
      super(props);
      this.slider = React.createRef();
    }


    componentDidMount() {
      const { i } = this.props;
      // при загрузке попапа отпрявляяем слайдер сразу на то фото,
      // на которое кликнул пользователь
      this.goTo(i);
    }

    goTo = (index) => {
      this.slider.current.slickGoTo(index, 'false');
    }

    render() {
      const {
        item, photo_set, active, close, gallery_title, uid, i, className,
      } = this.props;

      const { t } = this.context;

      return (
        <Popup active={active} close={close} className={className}>
          <Slider
            ref={this.slider}
            {... {
              dots: false,
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
              nextArrow: <NextArrow />,
              prevArrow: <PrevArrow />,
            }}
          >
            {photo_set.map(image => (
              <div key={image.photo.url}>
                <div className="photo_wrapper">
                  <img src={image.photo.url} alt={image.photo.alt} />
                </div>
              </div>
            ))}
          </Slider>

          <div className="photo-meta">
            <hr />
            <p className="count">
              {i + 1}
              {' '}
                /
              {' '}
              {photo_set.length}
            </p>
            <div className="title_download">
              {photo_set.length > 0
                    && RichText.render(photo_set[i].photo_title, PrismicConfig.linkResolver)}
              <a href={item.photo.url} download>
                <button className="download" title={t('Скачать фото')} type="button" />
              </a>
            </div>
            <Socials
              url={`${hostName}/photo/${uid}`}
              quote={gallery_title}
              image={photo_set[0].photo.url}
            />
          </div>
        </Popup>
      );
    }
}

PhotoPopup.propTypes = propTypes;
PhotoPopup.defaultProps = defaultProps;

const StyledPhotoPopup = styled(PhotoPopup)`
    .modal-content {
        width: 92rem;
        @media (max-width:768px){
            width: 69rem;
        }
        @media (max-width:415px) {
            height: 90%;
            max-height: 100%;
        }
        padding: 6rem 0 5.5rem;
        background: white;

        @media (max-width:415px) {
            .modal-close {
                right: 9px;
                top: 9px;
            }
        }

        .modal-close:before {
            height:1px;
        }

        .modal-close:after {
            width:1px;
        }

        .slick-prev {
            left: 3rem;
            z-index: 41;
            &::before{
                content:"";
            }
            @media (max-width:415px) {
                left: 1.8rem;
                top: 25rem;
                position: relative;

            }
        }

        .slick-next {
            right: 3rem;
            z-index: 41;
            &::before{
                content:"";
            }
            @media (max-width:415px) {
                position: relative;
                right: 1.8rem;
                left: 91%;
                top: 5px;
            }
        }

        .photo-meta {
            position: relative;
            left: 10%;     
            width: 80%;     
            @media (min-width: 416px) and (max-width:768px){
                left: 9rem;
                width: 74%;
            }
            @media (max-width:415px) {
                left: 1.8rem;
                width: 89%;
            }
            hr {
                background-color: rgba(4, 3, 3, 0.5);
                height: 1px;
                margin: 0;
                @media (max-width:415px) {
                    margin: 1.8rem 0;
                }
                width: 100%;
            }

            .count {
                color: rgba(61,62,66,0.7);
                font-size: 1.6rem;
                line-height: 2.3rem;
                margin-top: 1.5rem;
            }

            .article-socials {
                text-align: left;
                display:table;
                margin: 4.5rem -2.5rem 0 auto;
                @media (max-width:768px){
                    margin: 6rem -2.5rem 0 auto;
                }

                p {
                    text-transform: uppercase;
                    font-size: 1.4rem;
                    color: #040303;
                    display: block;
                    margin-right: 2rem;
                    font-weight: normal;
                    margin-bottom: 2rem;
                }
            }
            .title_download {
                display: flex;
                @media (max-width:415px) {
                    display: block;
                }
                align-items: baseline;
                justify-content: space-between;
                flex-direction: row;

                div {
                    display: inline-block;
                    @media (max-width:415px) {
                        display: block;
                    }
                    flex:1;
                    p {
                        font-size: 1.6rem;
                        line-height: 2.3rem;
                        font-weight: bold;
                        margin-top: 1.4rem;
                        color: #040303;
                        margin-right: 22rem;
                        @media (min-width: 416px) and (max-width:768px){
                            margin-right: 11.5rem;
                        }
                        @media (max-width:415px) {
                            margin-right: 0;
                        }
                    }
                }
                .download {
                    background: url('/static/download_photo.svg');
                    background-size: cover;
                    height: 3.5rem;
                    width: 3.5rem;
                    border: 0;
                    display: inline-block;
                    @media (max-width:415px) {
                        display: block;
                        margin: 0.5rem 0 0 auto;                    }
                    }
                    cursor: pointer;
                    position: relative;
                    top: 7px;

                    &:hover {
                        background: url('/static/download_photo_hover.svg');
                        background-size: cover;
                        height: 3.5rem;
                        width: 3.5rem;
                        border: 0;
                    }
                }
            }

        .photo_wrapper {
            width: 80%;
            @media (min-width: 416px) and (max-width:768px){
                width: 51rem;
            }
            @media (max-width:415px) {
                width: 90%;
            }

            margin: 0 auto 2rem;
        }
    }
`;

export default StyledPhotoPopup;
