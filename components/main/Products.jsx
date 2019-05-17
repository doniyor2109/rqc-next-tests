import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProductType from './productType';
import ProductCard from './ProductCard';
import MainCategory from '../shared/styled/MainCategory';


const Products = ({items, className }, { t }) => (
  <section className={className} id="products">
    <div className="container">
      <MainCategory>
        {t('Продукты')}
      </MainCategory>
      <div className="columns is-multiline">
        {items.map((item, index) => <ProductCard item={item} key={item.id} big={index < 2} />)}
      </div>
    </div>
  </section>
);

const StyledProducts = styled(Products)`
    padding: 6rem 0 8rem;
    margin-top: 7rem;
    background: #F7F9FB;
`;

Products.contextTypes = {
  t: PropTypes.func,
};

Products.propTypes = {
  items: PropTypes.arrayOf(ProductType),
  className: PropTypes.string.isRequired,
};

Products.defaultProps = {
  items: [],
};

export default StyledProducts;
