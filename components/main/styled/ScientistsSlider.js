import styled from 'styled-components';

const ScientistsSlider = styled.section`
    padding: 6rem 0;
    .slick-slider {
        width: 101%;
        clear: both;
    }
    .slick-list {
        margin: 0 0 0 -15px; 
    }

    .slick-prev, .slick-next {
        z-index: 9;
        top: 13%;

    }
    .slick-prev {
        left: -3.5rem;
    }
    .slick-next {
        right: -3rem;
    }
    @media (min-width:416px) and (max-width: 768px) {

        .slick-slider {
            width: 80%;
            margin: 0 auto;
        }
    }
    @media (max-width: 415px) {
        padding: 3rem 0;
        margin-top: 3rem;

        .slick-slider {
            width: 105%;
            margin: 0 auto;
        }

        .slick-prev, .slick-next {
            top: -4%;
        }

        .slick-prev {
            left: 0;
        }

        .slick-next {
            right: 7px;
        }
    }
`;

export default ScientistsSlider;
