import React from 'react'

export const ArrowButton = ({text, url, color, onClick, target_blank}) => {

  if (url) { 
    return (
    <a href={url} target={target_blank ? "_blank" : ""} rel="noopener noreferrer">
      <div className="square_button" style={{border: "2px solid #" + color, color: "#" + color}}>
        {text}
        <img src={"/static/arrow_" + color + ".svg"} alt="Стрелка для кнопки"/>
      </div>
    </a>
  )} else { 
    return (
    <div className="square_button" onClick={onClick} style={{border: "2px solid #" + color, color: "#" + color}}>
      {text}
      <img src={"/static/arrow_" + color + ".svg"} alt="Стрелка для кнопки"/>
    </div>
  )}
}
