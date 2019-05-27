import styled from 'styled-components';

export const Title = styled.p`
    font-size: 1.6rem;
    line-height: 2.3rem;
    font-weight: bold;
    color: rgba(4,3,3,0.7);
    margin-bottom:3rem;
`;


export const TeamLead = styled.div`
    font-size: 1.6rem;
    line-height: 2.3rem;

    h1 {
        font-size: 2.2rem;
        line-height: 2.7rem;
        font-weight: bold;
    }
    .group {
        color: rgba(4,3,3,0.7);
        margin-top: 2rem;
        display: block;
        font-weight: bold;

        a {
            color: #3998D1;
            display: block;
            font-weight: bold;
            h1 {
                font-size: 1.6rem;
                line-height: 2.3rem;
            }            
        }

    }
    .email {
        color: rgba(4,3,3,0.7);
        margin-top: 2rem;
        font-weight: bold;
        a {
            color: #3998D1;
        }
    }
    .cv {
        display: block;
        margin-top: 2rem;
        color: #3998D1;
        font-weight: bold;
    }
`;

export const Themes = styled.div`

    ul {
        list-style: disc;
        margin-left: 2rem;
        li {
            font-size: 2.2rem;
            line-height: 2.7rem;
            margin-bottom: 2.7rem;
            :nth-last-of-type(1) {
                margin-bottom:0;
            }
        }
    }
`;

export const Button = styled.button`
    background: transparent;
    border: 0;
    padding: 0;
    text-align: center;
    width: 100%;
    margin-top: 4rem;
    :focus {
        outline: 0;
    }
    @media (max-width:415px) {
        margin-left: -1rem;
    }
`;

export const HR = styled.hr`
    background: rgba(4,3,3,0.5);
    height: 1px;
`;
