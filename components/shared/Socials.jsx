import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//share buttons

import {
  FacebookShareButton,
  VKShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  VKIcon,
  TelegramIcon,
} from 'react-share'

const StyledSocialButtons = styled.div`
  .article-socials {
    p {
      text-transform: uppercase;
      font-size: 1.4rem;
      color: #040303;
      display: inline-block;
      margin-right: 2rem;
    }
    .SocialMediaShareButton {
      display: inline-block;
      margin-right: 3rem;
      vertical-align: top;
      top: -5px;
      position: relative;

      .social-icon {
        circle {
          fill: #818181;
        }
      }

      .social-icon:hover {
        circle {
          fill: #3998d1;
        }
      }

      div {
        display: inline-block;
      }
    }
  }
  @media screen and (max-width: 415px) {
    .article-socials {
      p {
        display: block;
        margin-bottom: 2rem;
      }
      .SocialMediaShareButton {
        margin-right: 2rem;
      }
    }
  }
`
const Socials = ({ url, quote, image }, context) => {
  return (
    <StyledSocialButtons>
      <div className="article-socials">
        <p>{context.t('Поделиться')}</p>
        <FacebookShareButton url={url}>
          <FacebookIcon size={30} round quote={quote} />
        </FacebookShareButton>

        <VKShareButton url={url} title={quote} image={image}>
          <VKIcon size={30} round />
        </VKShareButton>

        <TwitterShareButton url={url} title={quote}>
          <TwitterIcon size={30} round />
        </TwitterShareButton>

        <TelegramShareButton url={url} title={quote}>
          <TelegramIcon size={30} round />
        </TelegramShareButton>
      </div>
    </StyledSocialButtons>
  )
}

Socials.contextTypes = {
  t: PropTypes.func,
}

export default Socials
