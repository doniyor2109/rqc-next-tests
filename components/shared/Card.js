import React from 'react'
import { ArrowButton } from './ArrowButton.js'

export const Card = (props) => {

  const backstyle = {
    background: props.imageurl ? "url(" + props.imageurl + ")" : props.backgroundColor
  }

  return (
    <div className={props.half ? "card half" : "card"} style={backstyle}>
      {props.children}
      <ArrowButton url={props.button_url} color={props.button_color}/>
    </div>
  )
}
