import React from 'react'

const Card = (props) => {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.authors}</div>
      <div>{props.rating}</div>
      <div>{props.published_at}</div>
      <div>{props.description}</div>
      <div>{props.pageCount}</div>
      <div>{props.rating}</div>
      <div>{props.subject}</div>
    </div>
  )
}

export default Card
