import React from 'react'
import PropTypes from 'prop-types'
import Milestone from "./Milestone"
import MainCategory from '../shared/styled/MainCategory';


class Timeline extends React.Component {

    static contextTypes = {
        t: PropTypes.func
    }

    render() {
        const { timeline } = this.props
        return (
        <div className="timeline">
            <MainCategory>
                {this.context.t("Таймлайн")}
            </MainCategory>
            <div className="mlstones">
                {timeline.map((milestone, index) => <Milestone milestone={milestone} key={index}/>)}
            </div>
        </div>
        )
    }
}

export default Timeline