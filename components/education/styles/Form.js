import styled from 'styled-components';

const Form = styled.div`
  .modal-content {
    width: 73rem;
    @media (max-width: 415px) {
        width: 100%;
        display: block;
    }
    background: white;
    padding: 6rem 9.5rem;

    .select_wrapper {
      display: flex;
      align-items: center;
      margin-top: 6rem;
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
      .select-container {
        width: 50%;
      }
      .select__control {
        border-color: rgba(5, 4, 4, 0.5);
        border-radius: 0;
        height:3.5rem;
      }
      .select__placeholder {
        font-weight: normal;
        font-size: 1.6rem;
        line-height: 2.4rem;
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
      .select__option--is-disabled {
        font-style: italic;
        color: rgba(4,3,3,0.5);
      }
      .select__indicator-separator {
        display: none;
      }
      .group-select__dropdown-indicator {
        color:rgba(5, 4, 4, 0.5)
      }
    }
    .fullwidth {
        display: block;
        width: 100%;
    }
    .halfwidth {
        display: inline-block;
        width: 47%;
    }
    input[name], textarea {
        border: 0;
        border-bottom: 1px solid rgba(4,3,3,0.5);
        font-family: 'DIN Pro';
        font-size: 1.6rem;
        line-height:3rem;
        color: rgba(4,3,3,0.7);
        margin-top: 4rem;
        &.error {
            &::placeholder {
                color: #585AA8;
            }
        }
        &:focus {
            outline: 0;
        }
    }
    textarea {
        margin: 2rem 0 4rem;
        border: 1px solid rgba(4,3,3,0.5);
    }
    .halfwidth_wrapper {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
    }
    input[name="name"], input[name="teamlead"] {
        margin-top: 3rem;
    }
    input[name="subject"] {
        margin-top: 2rem;
    }
    .details {
        font-size: 1.4rem;
        line-height: 2.3rem;
        font-weight: bold;
        margin-top: 4rem;
    }
    .form-submit {
        background: white;
        color: #3998D1;
        border: 2px solid #3998D1;
        width: 16rem;
        text-transform: uppercase;
        font-size: 1.4rem;
        font-weight: 500;
        padding: 1.1rem 0;
        &:hover {
            background: #3998D1;
            color: white;
        }
        &:focus{
            outline:0;
        }
    }
    .mark {
      font-style: italic;
      color: rgba(4,3,3,0.7);
      font-size: 1.4rem;

    }
    .error {
        color: #585AA8;
        font-size: 1.4rem;
        font-style: italic;
    }
  }
`;

export default Form;
