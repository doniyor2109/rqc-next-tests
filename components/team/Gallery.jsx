import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';

const Styled = styled.section`
  position: relative;
  .lab-name {
    position: absolute;
    left: 20rem;
    bottom: 8rem;
    color: white;
    background: #009ee2;
    padding: 2rem 5rem;
    font-size: 1.4rem;
  }
  @media (min-width: 416px) and (max-width:768px){
    .lab-name {
      left: 3rem;
      bottom: 3rem;
    }
  }
  @media (max-width:415px) {
    margin-bottom: -7rem;      
    .lab-name {
      position: relative;
      left: 0;
      bottom: 0;
      top: -4px;
    }
  }
`;


const Gallery = ({ images, groupname, phone }, { t }) => (
  <Styled>
    <ImageSlider slides={images} phone={phone} />
    <div className="lab-name">
      {`${t('Лаборатория группы')} ${t('«')}${groupname[0].text}${t('»')}`}
    </div>
  </Styled>
);

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    labimage: PropTypes.shape({
      dimensions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
      url: PropTypes.string,
    }),
  })),
  groupname: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  phone: PropTypes.string,
};

Gallery.defaultProps = {
  images: [],
  phone: null,
  groupname: [],
};

Gallery.contextTypes = {
  t: PropTypes.func,
};

export default Gallery;
