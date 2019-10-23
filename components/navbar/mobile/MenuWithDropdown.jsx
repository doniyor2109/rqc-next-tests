/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from './MenuItem';

const Styled = styled.div`

  .dropdown-divider {
    background-color: #c7c7c7;
    border: none;
    display: block;
    height: 2px;
    margin: 0.5rem 1.5rem;
  }

  .dropdown {
    width: 100%;

    &.is-active {

      display: block;
      
      .dropdown-header {
        svg {
          transform: rotate(180deg);
        }
      }
      .dropdown-menu {
        width:100%;
        display: block;
        position: relative;
      }
    }
    .dropdown-header {
      padding: 1rem 0;
      width: 100%;
      flex-grow: 2;

      a {
        background-color: white;
        border: 0;
        color: black;
        cursor: pointer;
        -ms-flex-pack: center;
        font-size: 2rem;
        white-space: pre-wrap;
        display: inline;
        flex-direction: row;
        align-items: baseline;
        text-align: left;
        justify-content: left;
        padding-left: 2.5rem;
      }
      svg {
        float: right;
        margin-right: 2rem;
        width: 1.4rem;
        margin-top: 0.7rem;
      }
    }
    .dropdown-menu {
      width: 100%;
    }
  }
`;

class MenuWithDropdown extends React.Component {
  state = {
    activeKey: 0,
  }

  handleClick = (e, key) => {
    e.preventDefault();
    const { activeKey } = this.state;
    if (activeKey === key) {
      this.setState({ activeKey: -1 });
    } else {
      this.setState({
        activeKey: key,
      });
    }
  }

  closeMenu = () => {
    const { close } = this.props;
    close();
  }

  render() {
    const { menu } = this.props;
    const { activeKey } = this.state;
    const { t } = this.context;
    // console.log('menuwithdropdown', menu);
    const items = menu.map((menuitem, key) => (
      <Fragment key={menuitem.primary.name}>
        <hr className="dropdown-divider" />
        <div className={activeKey === key ? 'dropdown is-left is-active' : 'dropdown is-left'}>
          <div className="dropdown-header">
            <Link href={menuitem.primary.url}>
              <a onClick={this.closeMenu} role="button" tabIndex={0}>
                {t(menuitem.primary.name)}
              </a>
            </Link>
            {(menuitem.items.length > 0)
              ? (
                <FontAwesomeIcon
                  icon="chevron-down"
                  onClick={(e) => { this.handleClick(e, key); }}
                  size="xs"
                />
              )
              : <div />
            }
          </div>
          <div className="dropdown-menu">
            <MenuItem onClick={this.closeMenu}>
              {menuitem.items}
            </MenuItem>
          </div>
        </div>
      </Fragment>
    ));
    return (
      <Styled>
        {items}
      </Styled>
    );
  }
}

MenuWithDropdown.contextTypes = {
  t: PropTypes.func,
};

MenuWithDropdown.propTypes = {
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
};

MenuWithDropdown.defaultProps = {
  menu: [],
};

export default MenuWithDropdown;
