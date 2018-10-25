import React from 'react'

export const FilterTag = ({active, children, onClick}) => {
  return (
    <button className={active ? "tag-for-search is-active" : "tag-for-search"} onClick={onClick}>
      {children}
    </button>
    )
}
