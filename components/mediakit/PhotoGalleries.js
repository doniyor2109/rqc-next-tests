import React, {Fragment} from 'react'
import GalleryCard from './GalleryCard'
import { Loading } from '../shared/loading.js'

class PhotoGalleries extends React.Component {

  state = {
    initialItems: this.props.initialItems
  }


  componentDidMount() {
    this.props.fetchItems(this.props.lang, this.state.initialItems)
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

    const { items, isFetching, nextPage, lang } = this.props

    if (this.props.initialItems === this.state.initialItems && isFetching) return <Loading /> 
    else return (
      <Fragment>
        <div className="columns is-multiline">
          {items.map((item, index) => 
            <GalleryCard item={item} key={index} lang={lang}/>
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

export default PhotoGalleries