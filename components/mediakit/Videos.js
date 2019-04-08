import React, {Fragment}  from 'react'
import Loading from '../shared/loading';
import VideoCard from './VideoCard'



class Videos extends React.Component {

  state = {
    initialItems: this.props.initialItems
  }

  componentDidMount() {
    this.props.fetchItems(this.props.lang, this.props.initialItems)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.initialItems !== prevState.initialItems) {
      this.props.fetchItems(this.props.lang, this.state.initialItems)
    }

    // обработка смены языка
    if (this.props.lang !== prevProps.lang) {
      this.props.fetchItems(this.props.lang, this.state.initialItems)
      }
  }

  render() {
    const { items, isFetching, nextPage } = this.props

    if (this.props.initialItems === this.state.initialItems && isFetching) return <Loading /> 
    else return (
      <Fragment>
        <div className="columns is-multiline">
          {items.map((item, index) => 
            <VideoCard item={item} key={index} />
          )}
        </div>
         <div className="more-news">
          <div className="columns">
              <div className="column is-centered">
              {this.props.initialItems < this.state.initialItems && isFetching && <Loading />}
              <hr />
                {nextPage &&
                <img className="more" alt="show more news" onClick={e => {this.give_me_more_news(e)}} src="/static/more.svg" />
                }
              </div>
          </div>
        </div>
      </Fragment>
    )
  }

  give_me_more_news(e) {
    e.preventDefault()
    this.setState({
      initialItems: this.state.initialItems + this.props.morenews
    })
  }
}

export default Videos