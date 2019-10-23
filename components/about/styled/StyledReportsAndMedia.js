import styled from 'styled-components';

const StyledReportsAndMedia = styled.section`
  padding: 9rem 0 0 0;

  .media-kit-teaser {
    margin-top: 6rem;
    position: relative;
    background: url('/static/mediakit_teaser.jpg');
    background-size: cover;
    height: 50rem;
    padding: 27.5rem 0 0 9.5rem;

    .title {
        font-size: 4.2rem;
        line-height: 4rem;
        font-weight: bold;
        color: white;
        text-transform: uppercase;
    }
    .description {
        font-size: 1.4rem;
        line-height: 1.8rem;
        color: white;
        width: 55%;
        margin-top: 2.5rem;
    }
    .square_button {
        right: 4rem;
        bottom: 3rem;
    }
  }

  .slick-slider {
    margin-top: 3rem;
    clear: both;
  }

  h3 {
    display: inline;
    margin: 0;
  }
  .slick-prev, .slick-next {
    z-index: 9;
  }

  .report-slide {
    height:50rem;
    color:white;
    padding: 3rem 1.5rem;
    font-family: "DIN Pro", sans-serif;
    position: relative;

    h1 {
      line-height: 4rem;
      font-size: 4.2rem;
      font-weight: bold;
      color: white;
      margin-top: 15.7rem;
      margin-bottom: 3rem;
      padding: 0 5rem 0 6.5rem;
    }

    h4 {
      font-size: 1.8rem;
      text-transform: uppercase;
      font-weight: normal;
      margin:0;
    }

    a {
      position: relative;
    }
  }
  @media screen and (max-width: 768px) {        

    .media-kit-teaser {
        margin-top: 0;
        position: relative;
        height: 50rem;
        padding: 23.5rem 0 0 9rem;

        .mediakit-wallpaper {
            height: 50rem;
        }

        .title {
            width: 80%;
        }
        .description {
            width: 70%;
        }
        .square_button {
            right: 3rem;
            bottom: 3rem;
        }
    }
}

    @media screen and (max-width: 415px) {

        padding: 10rem 0 0 0;

        .container {
            padding: 0;
        }
        h3 {
            margin-left: 3rem;
        }
        .report-slide {
            padding: 3rem 0;

            h1 {
                padding: 0 5.7rem;
                margin-top: 7rem;
            }
        }
        .slick-prev, .slick-next {
            bottom: 23rem;
            top:auto;
        }
        .media-kit-teaser {
            margin-top: 0;
            position: relative;
            height: 50rem;
            padding: 17.6rem 5.7rem 0 5.7rem;        

            .mediakit-wallpaper {
                height: 50rem;
            }
    
            .title {
                width: 100%;
            }
            .description {
                width: 80%;
            }
            .square_button {
                right: 3rem;
                bottom: 9rem;
            }
        }
    }
`;

export default StyledReportsAndMedia;
