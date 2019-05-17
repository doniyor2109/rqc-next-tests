import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Style = styled.div`
    .old-site-popup {
        background-color: #3998D1;
        margin-top: 1rem;

        p {
            font-size: 1.2rem;
            line-height: 1.6rem;
            color:white;
        }

        a {
            button {
            border: 2px solid white;
            font-size: 1.4rem;
            text-transform: uppercase;
            color:white;
            text-align: center;
            padding: 1rem 3.7rem;
            position: relative;
            font-weight: 500;
            background-color: #3998D1;
            cursor: pointer;
            }
        }
    }

    @media (min-width:416px) and (max-width: 768px) {
        .old-site-popup {
            a {
                button {
                    padding: 10px 10px;
                    width: 100%;
                }
            }
            p {
                margin-top: -0.5rem;
            }
        }
    }
    @media (max-width: 415px) {
        .old-site-popup {
            text-align: center;
            height: 17rem;

            a {
                padding: 11px 20px;
                top: 0;
            }
        }
    }
`;

// баннер с ссылкой на старый сайт
const OldSite = (props, context) => (
  <Style>
    <div className="old-site-popup">
      <div className="container">
        <div className="columns">
          <div className="column is-7-desktop is-offset-1-desktop is-7-tablet">
            <p>
              {context.t('Добро пожаловать на новый сайт РКЦ! Мы все еще работаем над его наполнением. Если вы не можете найти какую-то информацию, посмотрите на нашем старом сайте.')}
            </p>
          </div>
          <div className="column is-4-desktop is-5-tablet">
            <a href="http://prev.rqc.ru" target="_blank" rel="noopener noreferrer">
              <button>
                {context.t('Перейти на старый сайт')}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Style>
);

OldSite.contextTypes = {
  t: PropTypes.func,
};

export default OldSite;
