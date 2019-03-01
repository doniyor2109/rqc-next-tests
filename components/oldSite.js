import React from 'react'
import PropTypes from 'prop-types'

// баннер с ссылкой на старый сайт
const OldSite = (props, context) => (
    <div className="old-site-popup">
        <div className="container">
            <div className="columns">
                <div className="column is-7-desktop is-offset-1-desktop is-7-tablet">
                    <p>
                        {context.t("Добро пожаловать на новый сайт РКЦ! Мы все еще работаем над его наполнением. Если вы не можете найти какую-то информацию, посмотрите на нашем старом сайте.")}
                    </p>
                </div>
                <div className="column is-4-desktop is-5-tablet">
                    <a href="http://prev.rqc.ru" target="_blank" rel="noopener noreferrer">
                        <button>
                            {context.t("Перейти на старый сайт")}
                        </button>
                    </a>      
                </div> 
            </div>     
        </div>
    </div>
)

OldSite.contextTypes = {
    t: PropTypes.func
  }

export default OldSite