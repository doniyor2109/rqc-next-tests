import styled from 'styled-components';

const PhotoPage = styled.section`
    padding: 6rem 0;

    button {
        background: transparent;
        border: 0;
        padding: 0;
        :focus {
            outline: 0;
        }
    }

    h1 {
        font-size: 4.2rem;
        @media (max-width:415px) {
            font-size: 3.2rem;
        }
        font-weight: bold;
        color:#040303;
        text-transform: uppercase;
    }
    .date {
        margin-top:3rem;
        font-size: 1.4rem;
        line-height: 3rem;
        color: rgba(4,3,3,0.7)
    }
    .description {
        margin-bottom: 7.5rem;
        @media (max-width:768px){
            margin-bottom: 0;
        }

        p {
            margin-top: 6rem;
            font-size: 1.6rem;
            line-height: 2.3rem;
        }

    }
    .download_wrapper {
        text-align: right;
        width: 100%;
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 1rem;
        p {
            display: inline-block;
            color: #3998D1;
            font-size: 1.4rem;
            line-height: 3rem;
            font-weight: 500;
        }

        .download {
            background: url('/static/download_archive_white.svg');
            background-size: cover;
            height: 2rem;
            width: 2rem;
            border: 0;
            display: inline-block;
            margin-right: 1.5rem;
            cursor: pointer;

            &:hover {
                background: url('/static/download_archive_hover.svg');
                background-size: cover;
                height: 2rem;
                width: 2rem;
                border: 0;
            }
        }
    }
`;

export default PhotoPage;
