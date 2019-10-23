import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuWithDropdown from './MenuWithDropdown';
import Social from '../social';
import LangChoice from './LangChoice';
import Search from './Search';

const Styled = styled.div`

    padding: 12rem 0 0 0;
    margin-top: -8rem;
    z-index: 9;
    display: block;
    width: 100%;
    background: white;
    z-index: 8;
    position: absolute;
    box-shadow: 0px 1px grey;

    .social {
      text-align: center;
      margin-top: 0;
    }

`;

const Collapse = ({
  menu, switchLanguage, currentLanguage, close,
}) => (
  <Styled>
    <LangChoice
      switchLanguage={switchLanguage}
      currentLanguage={currentLanguage}
    />
    <Search close={close} />
    <MenuWithDropdown menu={menu} close={close} />
    <Social color="gray" />
  </Styled>
);

Collapse.contextTypes = {
  t: PropTypes.func,
};

Collapse.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      children_name: PropTypes.string,
      children_url: PropTypes.string,
    })),
    primary: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  })),
  close: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};

Collapse.defaultProps = {
  menu: [],
  currentLanguage: 'ru',
};

export default Collapse;
