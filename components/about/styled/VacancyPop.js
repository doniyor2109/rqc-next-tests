import styled from 'styled-components'

const VacancyPop = styled.div`
  .modal-content {
    width: 92rem;
    padding: 6rem 0;
    color: #040303;
    background: white;
    font-size: 1.6rem;
    line-height: 2.3rem;

    a {
      color: #3998d1;
      font-weight: bold;
    }

    hr {
      background-color: #040303;
      height: 1px;
      margin: 0;
    }
    h6.salary {
      margin: 6rem 0 3rem;
      @media (max-width: 768px) {
        margin: 9rem 0 3rem;
      }
      @media (max-width: 416px) {
        margin: 0 0 3rem;
      }
      padding: 3rem 0;
      font-weight: bold;
      border-top: 1px solid #040303;
      border-bottom: 1px solid #040303;
    }

    hr.final {
      margin: 3rem 0;
    }

    .vac-title {
      @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 9rem;
      }
      h3 {
        color: #040303;
        font-size: 2.2rem;
        line-height: 3rem;
        font-weight: bold;
        margin-bottom: 3rem;
        text-transform: uppercase;
      }
    }

    ul {
      margin-bottom: 3rem;
    }

    .description {
      margin-top: 3rem;

      strong,
      b {
        font-weight: 700;
      }
      p {
        margin-bottom: 1rem;
      }
      ul {
        list-style: disc;
        padding-left: 3rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .modal-content {
      width: 90%;
      padding: 5.3rem 6rem;
      overflow-y: scroll; /* has to be scroll, not auto */
      -webkit-overflow-scrolling: touch;
    }
  }
  @media screen and (max-width: 415px) {
    .modal-content {
      width: 100%;
      padding: 4rem 3rem;
      color: #040303;
      margin: 0 27px;
      max-height: 90%;
      position: relative;
      hr.salary {
        margin-top: 0;
      }
    }
  }

  &.english-vacancies {
    .modal-content {
      p.description-paragraph {
        margin-top: 3rem;
      }
    }
  }
`

export default VacancyPop
