/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.div`

  .partners_title {
    display: block;
    color: white;
    font-size: 1.4rem;
    margin-top: 1.5rem;
  }
  .partners_block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 2.4rem;

    @media (max-width: 415px) {
      flex-wrap: wrap;
      margin: 0 auto;
      justify-content: left;
    }
  }

  a {
    cursor: pointer;
    img {
      cursor: pointer;

    }
  }

  a:nth-of-type(1) {
    img {
      width: 8.4rem;
      height: 3.12rem;
    }
  }

  a:nth-of-type(2) {
    img {
      width: 11.8rem;
      height: 4.6rem;
    }
  }

  a:nth-of-type(3) {
    img {
      width: 15rem;
      height: 5.2rem;
    }
  }

  a:nth-of-type(4) {
    img {
      width: 16.3rem;
      height:3.6rem;
    }
  }

  a:nth-of-type(5) {
    img {
    width: 7.1rem;
    height: 5rem;
    }
  }
  @media (min-width: 416px) and (max-width: 768px){
      a:nth-of-type(2) {
          img {
          width: 8rem;
          height: 3.1rem;
          }
      }

      a:nth-of-type(3) {
          img {
              width: 10.9rem;
              height: 3.8rem;
          }
      }

      a:nth-of-type(4) {
          img {
              width: 11.8rem;
              height: 2.6rem;
          }
      }

      a:nth-of-type(5) {
          img {
              width: 4.5rem;
              height: 3.1rem;
          }
      }
  }
  @media (max-width: 415px) {

      a {
        margin-right: 2rem;
        img {
          margin-right: 0;
          margin-bottom: 3.8rem;
        }
      }

      a:nth-of-type(2) {
          img {
              width: 8rem;
              height: 3.1rem;
          }
      }
  
      a:nth-of-type(3) {
          img {
              width: 10.9rem;
              height: 3.8rem;
          }
      }
  
      a:nth-of-type(4) {

          img {
              width: 11.8rem;
              height: 2.6rem;
          }
      }
  
      a:nth-of-type(5) {
          img {
              width: 4.5rem;
              height: 3.1rem;
          }
      }
  }
`;

const Partners = ({ lang }, { t }) => (
  <div className="column is-9-desktop is-offset-2-desktop is-9-tablet is-offset-2-tablet">
    <List>
      <p className="partners_title">
        {t('Основные партнеры')}
        :
      </p>
      <div className="partners_block">
        {lang === 'ru'
          ? (
            <>
              <a href="http://misis.ru/university/struktura-universiteta/centre/90/" target="_blank" rel="noopener noreferrer">
                <img src="/static/nti.svg" alt="nti logo" />
              </a>
              <a href="http://misis.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/misis-rus.svg" alt="" />
              </a>
              <a href="https://minobrnauki.gov.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/MinObr-rus_new.svg" alt="" />
              </a>
              <a href="https://www.gazprombank.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/Gazprombank-rus.svg" alt="" />
              </a>
              <a href="https://sk.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/Sk-rus.svg" alt="" />
              </a>
            </>
          ) : (
            <>
              <a href="http://misis.ru/university/struktura-universiteta/centre/90/" target="_blank" rel="noopener noreferrer">
                <img src="/static/nti.svg" alt="nti logo" />
              </a>
              <a href="http://misis.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/misis-eng.svg" alt="" />
              </a>
              <a href="https://minobrnauki.gov.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/MinObr-eng_new.svg" alt="" />
              </a>
              <a href="https://www.gazprombank.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/Gazprombank-eng.svg" alt="" />
              </a>
              <a href="https://sk.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/static/Sk-eng.svg" alt="" />
              </a>
            </>
          )}
      </div>
    </List>
  </div>
);
Partners.contextTypes = {
  t: PropTypes.func,
};

Partners.propTypes = {
  lang: PropTypes.string,
};

Partners.defaultProps = {
  lang: 'ru',
};


export default Partners;
