import styled from 'styled-components';

const SliderSection = styled.section`

.slick-dots {
    bottom: 3rem;
    text-align: right;
    right: 24rem; 
    @media (min-width:416px) and (max-width: 768px) {
        right: 3rem;
    }
    @media (max-width: 415px) {
        right: 0;
        text-align: center;
    }
    li.slick-active {
      margin-right: 5rem; 

      button:before {
        opacity: 1;
        color: white;
        content: url("/static/slider-active-bar.png"); 
      }
    }
     
    li {
       margin: 0 1rem; 
       button:before {
        opacity: 1;
        color: white; 
      }
    }
  }


`;

export default SliderSection;