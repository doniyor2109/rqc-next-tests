import styled from 'styled-components'

const StyledContacts = styled.div`
  padding: 9rem 0 0 0;

  .contacts_wrapper {
    margin-top: 3rem;
    padding: 6rem 0;
    background-color: #f7f9fb;

    p {
      font-size: 1.6rem;
      line-height: 2.3rem;
    }
    p:not(:last-child) {
      margin-bottom: 2.3rem;
    }
    a {
      color: #3998d1;
    }
    ul {
      list-style: disc;
      padding-left: 3rem;
    }

    .howtogethere {
      display: flex;
      align-items: flex-start;
      margin-bottom: 3rem;

      .address {
        display: inline;
        div {
          display: inline;
          p {
            display: inline;
          }
        }
        h5 {
          font-size: 1.6rem;
          line-height: 2.3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        h5:nth-of-type(1) {
          margin-bottom: 2rem;
          margin-top: 1.2rem;
        }
        div:nth-of-type(3) {
          p {
            display: block;
          }
        }
      }
    }
    .map {
      margin: 0;
      height: 35rem;
      @media (max-width: 415px) {
        display: none;
      }
    }

    .map-phone {
      height: 35rem;
    }

    .contacts_icon {
      margin-right: 2rem;
    }
    .contacts_phone_mail {
      display: block;
      margin-bottom: 2.3rem;
      @media screen and (max-width: 415px) {
        margin-top: 3rem;
      }
      p {
        color: #040303;
        font-weight: normal;
        display: inline;
      }
    }

    .contacts_phone_mail div,
    .contacts_phone_mail a p,
    .contacts_icon {
      display: inline;
      color: #3998d1;
      font-weight: 500;
      flex-shrink: 0;
    }
    .contacts_phone_mail div p {
      position: relative;
      top: -5px;
    }

    .pr_wrapper {
      margin-left: 4rem;
      h5 {
        font-size: 1.6rem;
        line-height: 2.3rem;
        font-weight: bold;
        margin-bottom: 3rem;
      }
      a {
        color: #3998d1;
        font-weight: 500;
      }
    }
  }
`

export default StyledContacts
