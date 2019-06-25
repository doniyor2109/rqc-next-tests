import styled from 'styled-components';

const StyledPartners = styled.section`
    padding: 6rem 0;
    p  {
        font-size: 1.4rem;
        line-height: 1.8rem;
    }
    .partners-list {
        margin-top: 4rem;
    }
    .partner-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;

        .img_wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 15rem;
        }

        p {
            text-align: center;
        }
    }
`;

export default StyledPartners;
