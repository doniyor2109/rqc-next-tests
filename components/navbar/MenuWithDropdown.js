import React, {Fragment} from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// функция которая закрывает бургер при клике на позицию меню
const closeMenu = () => {
  document.querySelector('.navbar-burger').classList.toggle('is-active')
  document.getElementById('navMenu').classList.toggle('is-active')
}

const DropdownItem = (props, context) => {
  const {children} = props
  const ditems = children.map((item, key) =>
    <Link href={item.url} key={key}>
      <a className="dropdown-item" onClick={() => {closeMenu()}}>
        {context.t(item.name)}
      </a>
    </Link>
  )
  return (
    <div className="dropdown-content">
      {ditems}
    </div>
  )
}

class MenuWithDropdown extends React.Component {

  state = {
    activeKey: 0
  }

  render() {

    const { Menu, menuClick } = this.props

    const items = Menu.map((menuitem, key) => 
      <Fragment key={key}>
        <hr className="dropdown-divider" />
        <div key={key} className={this.state.activeKey === key ? "dropdown is-left is-active" : "dropdown is-left"}>
          <div className="dropdown-header">
            <Link href={menuitem.url} >
              <a onClick={() => {closeMenu()}}>{this.context.t(menuitem.name)}</a>
            </Link>
            {menuitem.name === 'Новости' || menuitem.name === 'Мероприятия' 
            ? <div></div>
            : <FontAwesomeIcon icon="chevron-down" size="2x" onClick={e => {this.handleClick(e, key)}}/>
            }
          </div>
          <div className="dropdown-menu">
            <DropdownItem children={menuitem.children} />
          </div>
        </div>
      </Fragment>
    )
    return (
      <Fragment>
        {items}
      </Fragment>
    )
  }

  handleClick = (e, key) => {
    e.preventDefault()
    if (this.state.activeKey === key) {
      this.setState({activeKey: -1})
    } else {
        this.setState({    
          activeKey: key
        })
    }
  }
}

MenuWithDropdown.contextTypes = {
  t: PropTypes.func
}

DropdownItem.contextTypes = {
  t: PropTypes.func
}

export default MenuWithDropdown;
