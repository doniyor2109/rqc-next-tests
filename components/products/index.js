import React from 'react'
import PropTypes from 'prop-types'
import {ArrowButton} from '../shared/ArrowButton'

const Products = (props, context) => (
    <section className="products">

        <div className="container">

         <p className="main-category">
              {context.t("Продукты")}
        </p>

        <div className="columns is-multiline">

            <div className="column is-6-desktop is-10-tablet">
                <div className="product large">
                    <div className="columns">
                        <div className="column is-6-desktop">
                            <h3>
                                {context.t("детектор одиночных фотонов")}
                            </h3>
                        </div>
                        <div className="column is-6-desktop">
                            <div className="img_wrapper">
                                <img src="/static/products_detector.png" />
                            </div>
                        </div>
                    </div>
                    <ArrowButton color="040303" />
                </div>

            </div>

            <div className="column is-6-desktop is-10-tablet">

                <div className="product large">
                    <div className="columns">
                        <div className="column is-6-desktop">
                            <h3>
                                {context.t("Femto Vision")}
                            </h3>
                            <p>
                                {context.t("Фемтосекундный лазер")}
                            </p>
                        </div>
                        <div className="column is-6-desktop">
                            <div className="img_wrapper">
                                <img src="/static/products_femtovision.png" />
                            </div>
                        </div>
                    </div>
                    <ArrowButton color="040303" />

                </div>
            
            </div>

            <div className="column is-4-desktop is-6-tablet">
                <div className="product small granat">
                    <h3>
                        {context.t("М-Гранат")}
                    </h3>
                    <p>
                        {context.t("Магнитокардиограф")}
                    </p>
                    <div className="img_wrapper">
                        <img src="/static/products_granat.png" />
                    </div>
                    <ArrowButton color="040303" />

                </div>
            </div>

            <div className="column is-4-desktop is-6-tablet">

                <div className="product small qrate">
                    <h3>
                        {context.t("Q Rate")}
                    </h3>
                    <p>
                        {context.t("Квантовые коммуникации")}
                    </p>
                    <div className="img_wrapper">
                        <img src="/static/products_qrate.png" />
                    </div>
                    <ArrowButton color="040303" />

                </div>
            
            </div>

            <div className="column is-4-desktop is-6-tablet">

                <div className="product small dephan">
                    <h3>
                        {context.t("Dephan Detectors")}
                    </h3>
                    <p>
                        {context.t("Твердотельный фотоумножитель")}
                    </p>
                    <div className="img_wrapper">
                        <img src="/static/products_dephan.png" />
                    </div>
                    <ArrowButton color="040303" />
                </div>
            
            </div>       
        </div>


        
        </div>


    </section>
)

Products.contextTypes = {
    t: PropTypes.func
  }
  

export default Products