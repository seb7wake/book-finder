import React from 'react'

const Card = (props) => {
  {
    /* <div>{props.title}</div>
<div>{props.authors}</div>
<div>{props.rating}</div>
<div>{props.published_at}</div>
<div>{props.description}</div>
<div>{props.pageCount}</div>
<div>{props.rating}</div>
<div>{props.subject}</div>
<div>{props.thumbnail}</div> */
  }
  return (
    <div className="card-wrapper">
      <div className="card-info">
        <div className="image-wrapper">
          <img src={props.thumbnail} />
        </div>
        <div className="book-info">
          <label className="book-title">{props.title}</label>
          <label className="authors">{props.authors}</label>
          <p>{props.description}</p>
          {props.rating && <p>{props.rating}/5</p>}
          {props.published_at && (
            <p>Year: {props.published_at.substring(0, 4)}</p>
          )}
        </div>
      </div>
      <style></style>
    </div>
  )
}

export default Card
