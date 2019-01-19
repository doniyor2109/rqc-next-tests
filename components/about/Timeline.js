import React from 'react'
import PropTypes from 'prop-types'
import Milestone from "./Milestone"


class Timeline extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }

    render() {
        const { timeline } = this.props
        return (
        <div className="timeline">
            <div className="main-category">{this.context.t("Таймлайн")}</div>
            <div className="mlstones">
                {timeline.map((milestone, index) => <Milestone milestone={milestone} key={index}/>)}
            </div>
        </div>
        )
    }
}

export default Timeline