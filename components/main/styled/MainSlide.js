import styled from 'styled-components'

const MainSlide = styled.div`
  .sl {
    height: 65rem;
    color: white;
    padding-top: 20rem;
    background: ${props => `url('${props.back.url}')`};
    background-size: cover;

    h1,
    h2 {
      text-transform: uppercase;
      line-height: 1;
    }
    h1 {
      font-weight: 900;
      font-size: 7.2rem;
    }
    h2 {
      font-weight: normal;
      font-size: 4.2rem;
    }
    h3 {
      font-size: 2.2rem;
      font-weight: normal;
      margin-top: 2.5rem;
      line-height: 2.7rem;
    }
    .square_button {
      height: auto;
      padding: 1.2rem 4rem;
      position: relative;
      left: 0;
      overflow: hidden;
      top: 6.5rem;
      font-size: 1.4rem;
      text-transform: uppercase;
      display: table;
    }
  }
  @media (min-width: 416px) and (max-width: 768px) {
    .sl {
      background: ${props => `url('${props.back.ipad.url}')`};

      h1 {
        font-weight: bold;
        font-size: 7rem;
      }
      h2 {
        font-weight: normal;
        font-size: 4rem;
      }
      h3 {
        font-weight: normal;
        font-size: 2.2rem;
        line-height: 2.7rem;
      }
    }
  }
  @media (max-width: 415px) {
    .sl {
      height: 100vh;
      padding-top: 19rem;
      background: ${props => `url('${props.back.iphone.url}')`};

      h1 {
        font-weight: bold;
        font-size: 4rem;
      }
      h2 {
        font-size: 2rem;
        font-weight: normal;
      }
      h3 {
        font-size: 1.8rem;
        line-height: 2.3rem;
        font-weight: normal;
      }
      .square_button {
        width: 100%;
        text-align: center;
        top: 8rem;
      }
    }
  }
`

export default MainSlide
