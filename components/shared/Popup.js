import React from 'react'

const Popup = props => (

    // компонент popup, чтобы кнопка закрытия окна работала ему нужно передать 
    // в props фунцкию close(), которая в родительском компоненте через state будет отвечать 
    // за закрытие окна 

    <div className={ props.active ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={e => props.close(e)}></div>
        <div className="modal-content" style={{background:'white'}}>
            {props.children}
            <button className="modal-close is-large" aria-label="close" onClick={e => props.close(e)}></button>
        </div>
    </div>
  )

export default Popup