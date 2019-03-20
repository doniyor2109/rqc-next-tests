import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {ArrowButton} from '../shared/ArrowButton'
import { RichText, Link } from 'prismic-reactjs'
import PrismicConfig from '../../prismic-configuration';

const Product = styled.div`
    background-color: white;
    color: #040303;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    @media (min-width:769px) {
        padding:${(props) => props.big ? '0 3rem' : '3rem'};
        height:${(props) => props.big ? '22rem' : '35rem'};
    }
    height: 35rem;
    padding: 3rem;
    @media (min-width:416px) and (max-width: 1088px) {
      height: ${(props) => props.big ? '32rem' : '35rem'};
    }

    h1 {
      font-size: 2.2rem;
      font-weight: bold;
      line-height: 2.5rem;
      @media (min-width:1089px) {
          padding-top:${(props) => props.big ? '30%' : 'inherit'};
      }
    }

    .img_wrapper {
        height: 100%;
        @media (min-width:1088px) {
            position: ${(props) => props.big ? 'absolute' : 'relative'};
            top: ${(props) => props.big ? '0' : '-3rem'};
            padding-right: ${(props) => props.big ? '3rem' : '0'};
        }
        position: relative;
        top: -3rem;
        text-align: center;
        img {
            height:100%;
        }
    }
`

const ProductCard = ({ item, big }, { t }) => {
  return (
    <div className={'column is-6-tablet ' + (big ? 'is-6-desktop' : 'is-4-desktop')}>
        <a href={Link.url(item.data.url, PrismicConfig.linkResolver)} target="_blank" rel="noopener noreferrer">
            <Product big={big}>
                <div className="columns is-multiline is-vcentered is-centered">
                    <div className={'column ' + (big ? 'is-6-desktop is-12-tablet' : 'is-12-desktop is-12-tablet')}>
                        {RichText.render(item.data.name, PrismicConfig.linkResolver)}
                    </div>
                    <div className={'column ' + (big ? 'is-6-desktop is-12-tablet' : 'is-12-desktop is-12-tablet')}>
                        <div className="img_wrapper">
                            <img src={item.data.image.url} alt={item.data.image.alt} />
                        </div>
                    </div>
                </div>
                <ArrowButton color="040303" />
            </Product>
        </a>
    </div>
  )
}

ProductCard.propTypes = {
    big: PropTypes.bool.isRequired,
    item: PropTypes.shape({
        data: PropTypes.shape({
            url: PropTypes.shape({
                url: PropTypes.string
            }),
            name: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string,
            })),
            image: PropTypes.shape({
                url: PropTypes.string,
            })
        })
    })
}

ProductCard.contextTypes = {
    t: PropTypes.func
}

export default ProductCard
