import styled from 'styled-components'

const Page = styled.div`
  .research-page {
    padding: 10rem 9rem !important;

    .page-main-heading {
      margin-bottom: 6rem;
    }
    p {
      margin-bottom: 2.3rem;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .research-publications {
    padding: 6rem 0 6rem;
  }

  .groups {
    background: #f7f9fb;
    padding: 6rem 0 6rem;

    .sci-card {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

      .back_holder {
        height: 27rem;
        position: relative;
      }
      .title {
        font-size: 2.2rem;
        line-height: 3rem;
        padding: 3rem;
        text-transform: uppercase;
        color: #040303;
        background: white;
        height: 15rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1 {
          font-weight: bold;
        }
      }
    }

    hr.more {
      margin: 3rem 0 3.5rem;
      width: 100%;
      height: 1px;
      background: rgba(4, 3, 3, 0.5);
    }
  }

  .more-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .more-text {
      background: transparent;
      border: 2px solid #3998d1;
      padding: 0 2.7rem;
      font-size: 1.2rem;
      line-height: 3rem;
      color: #3998d1;
      text-transform: uppercase;
      font-weight: bold;
      font-family: 'DIN Pro';
      cursor: pointer;
      &:focus {
        outline: 0;
      }
    }
    img {
      width: 3.5rem;
      height: 3.5rem;
      &:focus {
        outline: 0;
      }
      cursor: pointer;
    }
  }
  .columns {
    clear: both;
  }
`

export default Page
