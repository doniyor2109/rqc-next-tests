import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'
import {startClock, serverRenderClock} from '../redux/actions/nextActions'
import Examples from '../components/examples'
import Link from 'next/link'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))
    return {}
  }

  componentDidMount () {
    const {dispatch} = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    console.log("index", this.props)
    return (
      <Fragment>
        <Examples />
          <div>
            Click{' '}
              <Link href="/news">
                <a>here</a>
              </Link>
            for news articles
          </div>

          <div>
              <Link href="/about">
                <a>About</a>
              </Link>
          </div>
      </Fragment>
    )
  }
}

// const mapStateToProps = state => {
//   const { nextExample } = state
//   return { nextExample }
// }


export default connect()(Index)

// onClick={() => Router.push('/news', '/news', { shallow: true })}

// const mapStateToProps = state => {
//   const { post, byTag, language} = state
//   const { lang } = state.i18nState
//   return { post, lang, language, byTag }
// }

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(Object.assign({},
//       postActions,
//       langActions,
//       byTagActions
//     ), dispatch);
//   }

// export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Article))
