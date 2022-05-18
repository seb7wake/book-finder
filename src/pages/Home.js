import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/Loading'
import Card from '../components/Card'
import '../styles.css'

const Home = () => {
  const [hasSearched, setHasSearched] = React.useState(false)
  const [books, setBooks] = React.useState([])
  const [start, setStart] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [order, setOrder] = React.useState('Relevance')
  const [filter, setFilter] = React.useState('ebooks')
  const [search, setSearch] = React.useState('')
  // https://www.googleapis.com/books/v1/volumes?q=inauthor:daniel+keyes+intitle:flowers+subject:&orderBy=newest&printType=books&startIndex=0

  // React.useEffect(() => {
  //   findBooks()
  // }, [])

  const findBooks = async () => {
    console.log('here')
    setLoading(true)
    let newSearch = document.getElementById('search-bar').value
      ? document.getElementById('search-bar').value
      : ''
    setSearch(newSearch)
    let newOrder = document.getElementById('sort').value
      ? document.getElementById('sort').value
      : order
    setOrder(newOrder)
    let newFilter = document.getElementById('filter').value
      ? document.getElementById('filter').value
      : filter
    setFilter(newFilter)
    let url =
      'https://www.googleapis.com/books/v1/volumes?q=' +
      newSearch.replace(' ', '+') +
      '&orderBy=' +
      newOrder +
      '&printType=books' +
      '&startIndex=0' +
      '&filter=' +
      newFilter
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    if (data.totalItems > 0) {
      setBooks(data.items)
    } else {
      setBooks([])
    }
    console.log(data.items)
    setLoading(false)
    setHasSearched(true)
  }

  const loadMoreBooks = async () => {
    console.log('here2')
    let newIndex = start + 10
    let newUrl =
      'https://www.googleapis.com/books/v1/volumes?q=' +
      search.replace(' ', '+') +
      '&orderBy=' +
      order +
      '&printType=books' +
      '&startIndex=' +
      newIndex +
      '&filter=' +
      filter
    console.log(newUrl)
    setStart(newIndex)
    const res = await fetch(newUrl)
    const data = await res.json()
    console.log(data.items)
    const currBooks = books
    const newBooks = [...currBooks, ...data.items]
    setBooks(newBooks)
  }

  const update = () => {
    if (books.length > 0) {
      findBooks()
    }
  }

  const headerAndSearch = () => {
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
            />
            <input
              type="button"
              id="search-btn"
              onClick={findBooks}
              value="Search"
            />
            <br />
            <div className="filters">
              <select id="sort" onChange={update}>
                <option value="relevance"> Relevance </option>
                <option value="newest"> Newest</option>
              </select>
              <select id="filter" onChange={update}>
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

  return (
    <div>
      {books.length > 0 && hasSearched ? (
        <div>
          <InfiniteScroll
            style={{
              backgroundColor: '#F0F0F0',
              paddingLeft: '25px',
              paddingRight: '25px',
            }}
            dataLength={books.length} //This is important field to render the next data
            next={loadMoreBooks}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            refreshFunction={() => {
              return books
            }}
          >
            {headerAndSearch()}
            <br />
            <div className={'container'}>
              {loading ? (
                <Loading />
              ) : (
                books.map((item) => (
                  <Card
                    key={item.etag}
                    authors={item.volumeInfo.authors}
                    title={item.volumeInfo.title}
                    published_at={item.volumeInfo.publishedDate}
                    description={item.volumeInfo.description}
                    pageCount={item.volumeInfo.pageCount}
                    rating={item.volumeInfo.averageRating}
                    subject={item.volumeInfo.categories}
                    thumbnail={item.volumeInfo.imageLinks.thumbnail}
                  />
                ))
              )}
            </div>
          </InfiniteScroll>
        </div>
      ) : hasSearched ? (
        <div>
          {headerAndSearch()}
          <br />
          <div
            style={{ textAlign: 'center', marginTop: '5%', fontSize: '20px' }}
          >
            There are no books that match your search!!
          </div>
        </div>
      ) : (
        <div>{headerAndSearch()}</div>
      )}
    </div>
  )
}
export default Home
