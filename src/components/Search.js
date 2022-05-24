import React from 'react'
import '../styles.css'

const Search = (props) => {
  return (
    <div>
      <header>
        <div className="title">Book Finder</div>
        <div className="subtitle">Created using the Google Books API</div>
      </header>
      <div className="form">
        <div className="query-fields">
          <input
            id="search-bar"
            placeholder="Search using book titles, authors, and more..."
            type="text"
            onKeyDown={(e) =>
              e.key === 'Enter' && props.changeSearch(e.target.value)
            }
          />
          <input
            type="button"
            id="search-btn"
            onClick={(e) =>
              props.changeSearch(document.getElementById('search-bar').value)
            }
            value="Search"
          />
          <br />
          <div className="filters">
            <select id="sort" onChange={props.updateFilters}>
              <option value="relevance"> Relevance </option>
              <option value="newest"> Newest</option>
            </select>
            <select id="filter" onChange={props.updateFilters}>
              <option value="ebooks"> All ebooks </option>
              <option value="free-ebooks"> Free ebooks</option>
              <option value="paid-ebooks"> Paid ebooks</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
