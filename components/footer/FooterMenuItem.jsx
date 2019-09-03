/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


const FooterMenuItem = ({ children, products }) => (
  <div>
    {children.map((item) => {
      if (item.children_url) {
        return (
          <Link href={item.children_url} key={item.children_name}>
            <a
              className="footer-menu-item"
              target={products ? '_blank' : '_self'}
              rel={products ? 'noopener noreferrer' : 'undefined'}
            >
              {item.children_name}
            </a>
          </Link>
        );
      }
      return null;
    })}
  </div>
);

FooterMenuItem.propTypes = {
  products: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

FooterMenuItem.defaultProps = {
  products: false,
};

FooterMenuItem.contextTypes = {
  t: PropTypes.func,
};

export default FooterMenuItem;
