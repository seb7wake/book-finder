import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/Loading'
import Search from '../components/Search'
import Card from '../components/Card'
import '../styles.css'

const Home = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [hasSearched, setHasSearched] = React.useState(false)
  const [books, setBooks] = React.useState([])
  const [start, setStart] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [order, setOrder] = React.useState('Relevance')
  const [filter, setFilter] = React.useState('ebooks')
  const [search, setSearch] = React.useState('')
  // https://www.googleapis.com/books/v1/volumes?q=inauthor:daniel+keyes+intitle:flowers+subject:&orderBy=newest&printType=books&startIndex=0

  useEffect(() => {
    const keyword = new URLSearchParams(location.search).get('keyword')
    if (keyword) {
      console.log(keyword)
      document.getElementById('search-bar').value = keyword
      findBooks()
    }
  }, [location])

  const findBooks = async () => {
    // Adjust to handle possible errors
    window.scrollTo(0, 0)
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
      // setBooks([])
      setBooks(data.items)
    } else {
      setBooks([])
    }
    console.log(data.items)
    setLoading(false)
    setHasSearched(true)
  }

  const findAuthor = async (author) => {
    window.scrollTo(0, 0)
    console.log(author)
    setLoading(true)
    setSearch(author)
    let url =
      'https://www.googleapis.com/books/v1/volumes?q=' +
      author.replace(' ', '+') +
      '&orderBy=' +
      order +
      '&printType=books' +
      '&startIndex=0' +
      '&filter=' +
      filter
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
    document.getElementById('search-bar').value = author
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

  const displayBooks = () => {
    return loading ? (
      <Loading />
    ) : (
      books.map((item) => (
        <Card
          key={item.etag}
          id={item.id}
          authors={item.volumeInfo.authors ? item.volumeInfo.authors[0] : ''}
          title={item.volumeInfo.title}
          published_at={item.volumeInfo.publishedDate}
          description={item.volumeInfo.description}
          pageCount={item.volumeInfo.pageCount}
          rating={item.volumeInfo.averageRating}
          subject={item.volumeInfo.categories}
          thumbnail={item.volumeInfo.imageLinks?.thumbnail}
          selectAuthor={changeSearch}
        />
      ))
    )
  }

  const updateFilters = () => {
    if (books.length > 0) {
      findBooks()
    }
  }

  const changeSearch = (value) => {
    document.getElementById('search-bar').value = value
    navigate('/search?keyword=' + value)
  }

  return (
    <div>
      {books.length > 0 ? (
        <div>
          <InfiniteScroll
            style={{
              backgroundColor: '#F0F0F0',
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
            <Search changeSearch={changeSearch} updateFilters={updateFilters} />
            <br />
            <div className={'container'}>{displayBooks()}</div>
          </InfiniteScroll>
        </div>
      ) : hasSearched ? (
        <div>
          <Search changeSearch={changeSearch} updateFilters={updateFilters} />
          <br />
          <div
            style={{ textAlign: 'center', marginTop: '5%', fontSize: '20px' }}
          >
            There are no books that match your search!!
          </div>
        </div>
      ) : (
        <div>
          <Search changeSearch={changeSearch} updateFilters={updateFilters} />
        </div>
      )}
    </div>
  )
}
export default Home
