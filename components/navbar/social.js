import React from 'react';

const Social = ({withSlider}) => (
    <div className="social navbar-item">
      <a href="https://www.facebook.com/ruquantumcenter/" 
         className={(withSlider ? "is-white opacity080" : "is-black opacity050") + " navbar-item"}
         target="_blank" rel="noopener noreferrer">
        <img src={withSlider ? "/static/fb_white.svg" : "/static/fb_gray.svg"} alt="" />
      </a>
      <a href="https://vk.com/ruquantumcenter" 
         className={(withSlider ? "is-white opacity080" : "is-black opacity050") + " navbar-item"}
         target="_blank" rel="noopener noreferrer">
        <img src={withSlider ? "/static/vk_white.svg" : "/static/vk_gray.svg"} alt="" />
      </a>
      <a href="https://twitter.com/ruquantumcenter" 
         className={(withSlider ? "is-white opacity080" : "is-black opacity050") + " navbar-item"}
         target="_blank" rel="noopener noreferrer">
        <img src={withSlider ? "/static/twitter_white.svg" : "/static/twitter_gray.svg"} alt="" />
      </a>
    </div>
)

export default Social
