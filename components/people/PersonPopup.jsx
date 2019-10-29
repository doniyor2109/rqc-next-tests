import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as personActions from '../../redux/actions/person';
import * as langActions from '../../redux/actions/lang';

import Popup from '../shared/Popup';
import Loading from '../shared/loading';
import PersonPopupContent from './PersonPopupContent';

const PersPopup = styled.div`
    .modal-content {
      width: 92rem;
      padding: 5rem 0;
      background: white;
      min-height: 20rem;
      @media (max-width: 768px) {
        width: 100%;
        padding: 5rem 3rem;
        margin: 0px 4rem;
        overflow-y: scroll; /* has to be scroll, not auto */
        -webkit-overflow-scrolling: touch;
      }
      @media (max-width: 415px) {
        margin: 3rem 0;
        max-height: calc(100vh - 3rem);
      }
      .columns {
        width: 100%;
      }
    }
    .position p {
      border-bottom: 0;
    }
    .awards {
      p  {
        font-size: 1.4rem;
        font-weight: normal;
        line-height: 1.8rem;
        margin-bottom: 1.8rem;
        overflow-wrap: break-word;
      }
    }
    .portrait_wraper {
      text-align: center;
      @media (max-width: 768px) {
        .portrait {
          width: 25.5rem;
        }
      }
      @media (max-width: 415px) {
        .portrait {
          margin: 0;
        }
      }  
    }
    .awards_img {
      margin-right: 1rem;
      top: 6px;
      position: relative;   
    }
    h1 {
      font-size: 1.8rem;
      text-transform: uppercase;
      display:inline-block;
      margin-bottom: 3rem;
    }
    .wall{
      opacity: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      @media (max-width: 768px) {
        width: 92%;
        height: 92%;
      }
      background: white;
      z-index: 1;
      display: flex;
      justify-content: center;
    }
    hr {
      background-color: #D8D8D8;
    }
    @media (max-width: 768px) {
      hr {
        margin: 2.9rem 0 6rem 0;
      }
      .name {
        margin-top: 3rem;
      }
    }
    @media (max-width: 415px) {
      .name {
          margin-top: 4rem;
      }
      hr {
        margin: 2rem 0 4rem 0;
      }
    }

    .personal_logo {
      margin-top: 2.5rem;
    }
    @media (max-width: 415px) {
      .personal_logo {
        margin-top: 2rem;
      }
    }
`;

class PersonPopup extends React.Component {
  componentDidMount() {
    const { id, lang, fetchPerson } = this.props;
    fetchPerson(id, lang);
  }

  render() {
    const { active, close, person } = this.props;
    const { item } = person;
    return (
      <PersPopup>
        <Popup close={close} active={active}>
          {person.isFetching
          && (
          <div className="wall">
            <Loading />
          </div>
          )
         }
          {item.data && <PersonPopupContent item={item.data} />}
        </Popup>
      </PersPopup>
    );
  }
}

PersonPopup.propTypes = {
  active: PropTypes.bool,
  close: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  fetchPerson: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  person: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    item: PropTypes.shape({
      data: PropTypes.shape({
        name: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        position: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        portrait: PropTypes.PropTypes.shape({
          url: PropTypes.string,
        }),
        titles: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        awards: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      }),
    }),
  }),
};

PersonPopup.defaultProps = {
  active: false,
  person: {
    item: {
      awards: '',
      name: {
        text: '',
      },
      position: [],
      portrait: {
        url: '',
      },
      titles: [],
    },
  },
};

const mapStateToProps = (state) => {
  const { person } = state;
  const { lang } = state.i18nState;
  return { person, lang };
};

const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  personActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PersonPopup);
