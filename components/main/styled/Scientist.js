import styled from 'styled-components';

const Scientist = styled.div`
.group-name {
    color: inherit;
  }

  p, li {
    border-bottom: 1px solid #818181;
    padding: 1rem 0;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1.8rem;
  }

  p:last-child {
    border: 0;
  }

  .sci-title {
    h1, h5 {
        font-weight: bold;
        font-size: 2.2rem;
        margin: 3rem 0;
        line-height: 2.5rem;
        width:60%;
    }
  }
  .sci-group  {
    a.group-name {
      h1 {
        color: #3998D1;
        font-weight: 500;
        border-bottom: 1px solid #818181;
        padding-bottom: 1rem;
        margin-top: 0.5rem;
      }
    }
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1.8rem;
  }

`;

export default Scientist;
