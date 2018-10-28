import React from 'react'
import Link from 'next/link'


class News extends React.Component {

    render() {
        console.log("news", this.props)
        
        return (
          <div>
            <h1>
                News 
            </h1>
            <ul>
                <li>
                    <Link href={{pathname: '/article', query: { uid: 'something-happened-there' }}} 
                          as='/article/something-happened-there'>
                        <a>
                            Something happened there
                        </a>
                    </Link>               
                </li>
                <li>
                    <Link href='/article?uid=putin-was-killed-by-accident' as='/article/putin-was-killed-by-accident'>
                        <a>Putin was killed by accident</a>
                    </Link>
                </li>
            </ul>
          </div>
        )
    }
}

export default News