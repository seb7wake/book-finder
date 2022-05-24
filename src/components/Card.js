import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Card = (props) => {
  const link = '/book/' + props.id
  const description = props.description
    ? props.description.replace(/(.{330})..+/, '$1…')
    : ''
  return (
    <div className="card-wrapper">
      <div className="card-info">
        <Link to={link}>
          <div className="image-wrapper">
            {props.thumbnail ? (
              <img src={props?.thumbnail} />
            ) : (
              <img
                src="http://books.google.com/books/publisher/content?id=n0YoEAAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE73oK6G_D1zdwuV9NHnjCWk5bfWGfOIbaBKzAow0C_wKbZQB42gFl5vODpWC6qeHySKJDTYfCAIwESPn0C7y2fmgqscAOxjNB8zZBh7V3SqNns4VOP0MAMepxnsxgz1sSwvRYrpQ&source=gbs_api"
                style={{ width: '128px', height: '204px' }}
              />
            )}
          </div>
        </Link>
        <div className="book-info">
          <Link to={link}>
            <label className="book-title">
              <strong>{props.title}</strong>
            </label>
          </Link>
          {props.authors ? (
            <label
              className="authors"
              value={props.authors}
              onClick={(e) => props.selectAuthor(e.target.innerText)}
            >
              {props.authors}
            </label>
          ) : (
            <label>Unknown author</label>
          )}
          <p className="description">{description}</p>
          <div className="card-details">
            {props.subject && <div>Category: {props.subject[0] + '    '}</div>}
            {props.rating && (
              <div>
                Rating: {props.rating}/5 {'    '}
              </div>
            )}
            {props.published_at && (
              <div>Year: {props.published_at.substring(0, 4) + '    '}</div>
            )}
            {props.pageCount && <div>Pages: {props.pageCount}</div>}
          </div>
        </div>
      </div>
      <style></style>
    </div>
  )
}

export default Card
