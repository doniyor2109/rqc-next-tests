import styled from 'styled-components';

const Styled = styled.header`
    background: ${props => (props.withSlider ? 'transparent' : 'white')};
    position: ${props => (props.withSlider ? 'absolute' : 'relative')};
    z-index: 1;
    width: 100%;

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 95%;

        @media (min-width:1024px) and (max-width: 1100px) {
            max-width: 100%;
            width: 100%;
        }
    }

`;

export default Styled;
