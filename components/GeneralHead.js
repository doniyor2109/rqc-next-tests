import React from 'react'
import Head from 'next/head'

const GeneralHead = () => (
    <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/static/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512"  href="/static/favicon/android-chrome-512x512.png" />
        <meta name="msapplication-TileImage" content="/static/favicon/mstile-150x150.png" />
        <link rel="manifest" href="/static/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#4d9ac8" />
        <meta name="msapplication-TileColor" content="#4d9ac8" />
        <meta name="theme-color" content="#ffffff" />
        {/* <script src="/static/metrika.js" async/> */}
    </Head>
)
export default GeneralHead
