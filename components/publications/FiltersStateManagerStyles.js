import styled from 'styled-components';

const Page = styled.div`
    .settings {
        background: #F7F9FB;
        padding: 3rem 0 4rem;
        margin: 4.5rem 0 ;
        h5 {
            font-size: 1.6rem;
            line-height: 2.3rem;
            margin-bottom:3rem;
        }
        h5.sort {
            margin: 3rem 0 2rem 0;
        }
        .select_wrapper {
            display: flex;
            align-items: center;
            @media (max-width: 768px) {
                align-items: flex-start;
                flex-direction: column;
            }           
            .name {
                font-size: 1.4rem;
                line-height: 3rem;
                font-weight: bold;
                margin-right: 1rem;
                @media (max-width:1088px) {
                    width: 11rem;
                }
                @media (max-width: 768px) {
                    font-size: 1.4rem;
                    line-height: 3rem;
                    font-weight: bold;
                }
                @media (max-width: 415px) {
                    display: block;
                    text-align: left;
                }
                @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
                    vertical-align: top;
                    padding-top: 3px; 
                }
            }
            .group-select-container {
                flex-grow: 1;
                @media (max-width: 768px) {
                    width: 80%;
                }
                @media (max-width: 415px) {
                    width: 100%;
                    display: block;
                }
            }
            .author-select-container {
                flex-grow: 1;
                @media (max-width: 768px) {
                    width: 80%;
                }
                @media (max-width: 415px) {
                    width: 100%;
                    display: block;
                }
            }
            .select__control {
                border-color: rgba(5, 4, 4, 0.5);
                border-radius: 0;
                height:3.5rem;
            }
            .select__placeholder {
                font-weight: normal;
                font-size: 1.4rem;
                line-height: 2.4rem;
                font-style: italic;
                font-family: 'DIN Pro';
                padding: 0px 2px 1px;
            }
            .select__option, .select__single-value {
                font-weight: normal;
                font-size: 1.6rem;
                line-height: 2.4rem;
                font-style: normal;
                font-family: 'DIN Pro';
                padding: 0px 2px 1px;
                color:#040303;
            }
            .select__indicator-separator {
                display: none;
            }
            .group-select__dropdown-indicator {
                color:rgba(5, 4, 4, 0.5)
            }
        }
    }
`;

export default Page;
