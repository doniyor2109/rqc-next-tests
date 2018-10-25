import React from 'react';

export class PreloadPosts extends React.Component {

  componentDidMount() {
    this.fetchIds(this.props.ids)
  }

  componentWillUpdate(nextProps) {
    // if (nextProps.ids !== this.props.ids) {
    //   this.fetchIds(nextProps.ids)
    // }
  }

  fetchIds(ids) {
    this.props.ids.forEach(id => {
        if (this.props.posts.byId[id]) {
          this.props.fetchPost(id)
        }
      }
    )
  }

  render() {
    return null
  }
}
