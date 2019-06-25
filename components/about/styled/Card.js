import styled from 'styled-components';

const Card = styled.div`
  height: 36rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 6rem 3rem 3rem 3rem;
  position: relative;
  cursor: pointer;

  h3 {
    color:#040303;
    font-size: 2.2rem;
    line-height: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  h6 {
    color:#040303;
    font-size: 1.6rem;
    line-height: 2.3rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }
  .description_teaser {
    color:#040303;
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

export default Card;
