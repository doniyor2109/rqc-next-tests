import React from 'react'
import PropTypes from 'prop-types'
import {ArrowButton} from '../shared/ArrowButton'

const Products = (props, context) => (
    <section className="products" id="products">

        <div className="container">`
            <p className="main-category">
                {context.t("Продукты")}
            </p>
            <div className="columns is-multiline">
                <div className="column is-6-desktop is-6-tablet">
                    <a href="http://goqrate.com/#photon-detector" target="_blank" rel="noopener noreferrer">
                        <div className="product large detector">
                            <div className="columns is-multiline is-vcentered">
                                <div className="column is-6-desktop is-12-tablet">
                                    <p>
                                        {context.t("Детектор одиночных фотонов")}
                                    </p>
                                </div>
                                <div className="column is-6-desktop is-12-tablet">
                                    <div className="img_wrapper">
                                        <img src="/static/products_detector.png" />
                                    </div>
                                </div>
                            </div>
                            <ArrowButton color="040303" />
                        </div>
                    </a>

                </div>

                <div className="column is-6-desktop is-6-tablet">
                    <a href="http://femtovision.ru/page5006824.html" target="_blank" rel="noopener noreferrer">
                        <div className="product large femto">
                            <div className="columns is-multiline is-vcentered">
                                <div className="column is-6-desktop is-12-tablet">
                                    <p>
                                        {context.t("Фемтосекундный лазер с диодной накачкой")}
                                    </p>
                                </div>
                                <div className="column is-6-desktop is-12-tablet">
                                    <div className="img_wrapper">
                                        <img src="/static/femt3.png" />
                                    </div>
                                </div>
                            </div>
                            <ArrowButton color="040303" />
                        </div>
                    </a>
                </div>

                <div className="column is-4-desktop is-6-tablet">
                    {/* <a href="" target="_blank" rel="noopener noreferrer"> */}
                        <div className="product small granat">
                            <p>
                                {context.t("Магнитометр")}
                            </p>
                            <div className="img_wrapper">
                                <img src="/static/products_granat.png" />
                            </div>
                            <ArrowButton color="040303" />
                        </div>
                    {/* </a> */}
                </div>

                <div className="column is-4-desktop is-6-tablet">
                    <a href="http://goqrate.com" target="_blank" rel="noopener noreferrer">
                        <div className="product small qrate">
                            <p>
                                {context.t("Квантовые коммуникации")}
                            </p>
                            <div className="img_wrapper">
                                <img src="/static/products_qrate.png" />
                            </div>
                            <ArrowButton color="040303" />
                        </div>
                    </a>
                </div>

                <div className="column is-4-desktop is-6-tablet">
                    <a href="https://www.dephan.com/" target="_blank" rel="noopener noreferrer">
                        <div className="product small dephan">
                            <p>
                                {context.t("Твердотельный фотоумножитель")}
                            </p>
                            <div className="img_wrapper">
                                <img src="/static/products_dephan.png" />
                            </div>
                            <ArrowButton color="040303" />
                        </div>
                    </a>
                </div>       
            </div>
        </div>
    </section>
)

Products.contextTypes = {
    t: PropTypes.func
  }
  

export default Products