import React from 'react'

export const Button = (props) => {

  const {text, url, color, onClick} = props
  if (typeof url !== "undefined") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="square_button" style={{border: "2px solid #" + color, color:"#" + color}} >
          {text}
        </div>
      </a>
    )} else { return (
      <div className="square_button" onClick={onClick} style={{border: "2px solid #" + color, color: "#" + color }}>
        {text}
      </div>
    )}

}
