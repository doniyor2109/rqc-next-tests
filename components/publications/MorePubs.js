import React from 'react'
import { Loading } from '../shared/loading.js'


const MorePubs = ({nextPage, isFetching, give_me_more_pubs}) => (
    <div className="more-news">
        <div className="columns">
            <div className="column is-centered">
                {isFetching && <Loading />}
                {nextPage &&
                <img className="more" alt="show more events" onClick={e => {give_me_more_pubs(e)}} src="/static/more.svg" /> }
            </div>
        </div>
    </div>
)

export default MorePubs