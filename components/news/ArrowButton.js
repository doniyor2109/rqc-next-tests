import React from 'react'

export const ArrowButton = ({text, color}) => (

      <div className="square_button" style={{border: "2px solid #" + color, color: "#" + color}}>
        {text}
        <img src={"/static/arrow_" + color + ".svg"} alt="Стрелка для кнопки"/>
      </div>
  )
