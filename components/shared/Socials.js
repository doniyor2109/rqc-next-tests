import React from 'react'
import PropTypes from 'prop-types'

//share buttons 

import {
    FacebookShareButton,
    VKShareButton,
    TwitterShareButton,
    TelegramShareButton, 
    FacebookIcon,
    TwitterIcon,
    VKIcon, 
    TelegramIcon
  } from 'react-share'
  
  

const Socials = ({url, quote}, context) => {
    return (
        <div className="article-socials">
            <p>
                {context.t("Поделиться")}
            </p>
            <FacebookShareButton url={url}> 
                <FacebookIcon size={30} round quote={quote} />
            </FacebookShareButton>

            <VKShareButton url={url} title={quote}>
                <VKIcon size={30} round />
            </VKShareButton>

            <TwitterShareButton url={url} title={quote}>
                <TwitterIcon size={30} round />
            </TwitterShareButton>

            <TelegramShareButton url={url} title={quote}>
                <TelegramIcon size={30} round />
            </TelegramShareButton>
        </div>

    )

}

Socials.contextTypes = {
    t: PropTypes.func
}

export default Socials