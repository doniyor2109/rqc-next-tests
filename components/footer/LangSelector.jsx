import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const handleClick = (switchLanguage, lang, e) => {
  e.preventDefault();
  switchLanguage(lang);
};

const Selector = styled.div`
    .dropdown {
        margin-top: 1rem;
        @media (min-width: 416px) and (max-width: 769px) {
            margin-top: 1rem;
        }
        @media (max-width: 415px) {
            margin: 0;
        }

        .dropdown-trigger {
            .navbar-link {
                background: transparent;
                color: white;
                border: 0;
                margin-bottom: 1rem;
                cursor: pointer;
                &:focus {
                    outline:0;
                }
                &:not(.is-arrowless)::after {
                    border-color: rgba(255,255,255,0.5);
                }
            }
        }
        .dropdown-menu {
            .dropdown-content {
                background-color: transparent;
                box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
                padding-bottom: 0.5rem;
                padding-top: 0.5rem;
                width: 7rem;
                @media (min-width: 416px) and (max-width: 769px) {
                    padding-left:0;
                }
                @media (max-width: 415px) {
                    margin-top: 0;
                }

                .navbar-item {                
                    background: transparent;
                    color: white;
                    border: 0;
                    margin-bottom: 1rem;
                    margin-left: 1rem;
                    @media (max-width: 415px) {
                        margin-left: 0;
                    }
                    cursor: pointer;
                    &:focus {
                        outline:0;
                    }
                }
        }
    }
}
`;

const LangSelector = ({ lang, switchLanguage }) => (
  <div className="column is-6-mobile is-1-desktop is-1-tablet">
    <Selector>
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <button className="navbar-link" aria-haspopup="true" aria-controls="dropdown-menu-footer" type="button">
            {lang === 'ru' ? 'RU' : 'EN'}
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu-footer" role="menu">
          <div className="dropdown-content">
            <button className="navbar-item" onClick={(e) => { handleClick(switchLanguage, 'en-gb', e); }} type="button">
              EN
            </button>
            <button className="navbar-item" onClick={(e) => { handleClick(switchLanguage, 'ru', e); }} type="button">
              RU
            </button>
          </div>
        </div>
      </div>
    </Selector>
  </div>
);

LangSelector.propTypes = {
  lang: PropTypes.string,
  switchLanguage: PropTypes.func.isRequired,
};

LangSelector.defaultProps = {
  lang: 'ru',
};

export default LangSelector;
