import React from 'react'

class Article extends React.Component {
    static getInitialProps ({ query: { uid } }) {
        return {uid}
  }


  render () {
    console.log("article", this.props)
    return (
      <div>
        <h2>
            Article about amazing story, how
        </h2>
        <h1 style={{color:"red"}}>
            {this.props.uid}
        </h1>
      </div>
    )
  }
}

export default Article
