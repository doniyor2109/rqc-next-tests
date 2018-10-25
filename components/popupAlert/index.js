import React from 'react'

export default class PopupAlert extends React.Component {


  constructor(props) {
    super(props)
    this.state = ({
      isActive : this.props.active
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isActive !== this.props.active) {
      this.setState({
        isActive : this.props.active
      })
    }
  }

  closeAll = () => {
    this.setState({
      isActive: false
    })
  }

  render () {

    const { active, message } = this.props

    const s = {
      fontFamily: "DIN Pro",
      fontSize: "1.6rem",
      color: "black"
    }


    return (

      <div className={this.state.isActive ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={this.closeAll}></div>
        <div className="modal-content" style={{background:'white', padding:'3rem'}}>
          <p style={s}>
            {message}
          </p>
        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }
}
