/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const FooterMenuItem = ({ children, products }) => (
  <div>
    {children.map(item => {
      // если ссылка внешняя, как в случае products, то используем <a>,
      // если внутренняя — Link
      if (item.children_url && !products) {
        return (
          <Link href={item.children_url} key={item.children_name}>
            <a className="footer-menu-item">{item.children_name}</a>
          </Link>
        )
      }
      return (
        <a
          href={item.children_url}
          key={item.children_name}
          className="footer-menu-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.children_name}
        </a>
      )
    })}
  </div>
)

FooterMenuItem.propTypes = {
  products: PropTypes.bool,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
}

FooterMenuItem.defaultProps = {
  products: false,
}

FooterMenuItem.contextTypes = {
  t: PropTypes.func,
}

export default FooterMenuItem
