import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import styled from 'styled-components'

import {ArrowButton} from '../shared/ArrowButton'
import ProductCard from './ProductCard';


const Products = ({items, phone, tablet, className}, { t }) => (
    <section className={className} id="products">
        <div className="container">
            <p className="main-category">
                {t("Продукты")}
            </p>
            <div className="columns is-multiline">
                    {items.map((item, index) => 
                        <ProductCard item={item} key={item.id} big={index < 2}/>
                    )}
            </div>
        </div>
    </section>
)

const StyledProducts = styled(Products)`
    padding: 6rem 0 8rem;
    margin-top: 7rem;
    background: #F7F9FB;
`

Products.contextTypes = {
    t: PropTypes.func
}
  

export default StyledProducts