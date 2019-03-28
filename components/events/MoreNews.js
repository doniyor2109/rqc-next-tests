import React from 'react'
import Loading from '../shared/loading';


const MoreNews = ({nextPage, isFetching, give_me_more_events, numberOfMoreNews}) => (
    <div className="more-news">
        <div className="columns">
            <div className="column is-centered">
                {isFetching && <Loading />}
            <hr />
                {nextPage &&
                <img className="more" alt="show more events" onClick={e => {give_me_more_events(e, numberOfMoreNews)}} src="/static/more.svg" /> }
            </div>
        </div>
    </div>
)

export default MoreNews