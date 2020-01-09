import styled from 'styled-components'

const Page = styled.section`
  padding: 10rem 0;

  .eps-block {
    margin-top: 9.4rem;
    .columns:first-of-type {
      margin-bottom: 3.3rem;
    }
  }

  .svg-block,
  .png-block {
    margin-top: 10rem;
  }
  .icon-text-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .description {
    font-size: 1.6rem;
    line-height: 2.3rem;
  }

  .icon {
    margin: 0 2.6rem 0 0.8rem;
    height: 3.8rem;
    width: 3rem;
  }
  a {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: #3998d1;
  }

  .logo-table {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    align-items: center;
    margin-top: 3rem;

    .cell {
      box-sizing: border-box;
      flex-grow: 1;
      width: 25%;
      @media (max-width: 415px) {
        width: 50%;
      }
      padding: 2rem 0.8rem;
      &.png,
      &.jpg {
        padding: 0;
      }
      overflow: hidden;
      list-style: none;
      text-align: center;
      &:nth-child(n + 5):nth-child(-n + 8) {
        background: #86d0f3;
      }
      &:nth-child(n + 9):nth-child(-n + 12) {
        background: #3e3e43;
      }

      img {
        height: 4rem;
        &.png,
        &.jpg {
          height: 8rem;
        }
      }
    }

    &.jpg {
      .cell {
        &:nth-child(n + 5):nth-child(-n + 8) {
          background: none;
        }
      }
    }
  }

  hr.logo-page-bottom {
    background: rgba(4, 3, 3, 0.5);
    height: 1px;
    margin-top: 10rem;
  }
`

export default Page
