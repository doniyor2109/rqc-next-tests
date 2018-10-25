import React from 'react'

const BlueButton = (props) => {

    const {onClick, isActive} = props
    return (
        <button className={isActive ? "more-info is-active" : "more-info"} onClick={e => {onClick(e)}}>
            {props.children}
        </button>
    )
}

export default BlueButton