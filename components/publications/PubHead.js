import React, {Fragment} from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import hostName from '../../host'

const PubHead = ({fb_locale}, context) => (
    <Head>
    <title>{context.t("Публикации")}</title>
    <meta property="og:url"                content={hostName + "/publications}"} />
    <meta property="og:type"               content="article" />
    <meta property="og:image"              content={hostName + "/static/qaqam.jpg"} />
    <meta property="og:locale:alternate"   content="en_US" />
        {(typeof fb_locale === 'undefined' || fb_locale === "ru_RU") && 
            <Fragment>
                <meta property="og:locale"             content="ru_RU" />
                <meta property="og:title"              content="Публикации" />
                <meta property="og:description"        content="Публикации научных групп РКЦ за все время" />
            </Fragment>
        }
        {fb_locale === "en_US" && 
            <Fragment>
                <meta property="og:locale"             content="en_US" />
                <meta property="og:title"              content="Publications" />
                <meta property="og:description"        content="RQC scientific publications" />
            </Fragment>
        }
    </Head>
)

PubHead.contextTypes = {
    t: PropTypes.func
}

export default PubHead