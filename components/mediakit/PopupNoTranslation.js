import React from 'react'

const PopupNoTranslation = ( {active, click} ) => (
    <div className={ active ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-content" style={{background:'white', padding:'3rem'}}>
        <p style={{
          fontFamily: "DIN Pro",
          fontSize: "1.6rem",
          color: "black"
        }}>
          Sorry, translation of content is not available at the moment.
          <br /><br />
          Check other stuff.
        </p>
        <br /><br />
        <button className="button is-warning is-large" onClick={click}>Check</button>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  )
            
export default PopupNoTranslation