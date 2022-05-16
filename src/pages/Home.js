import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/Loading'
import Card from '../components/Card'
import '../styles.css'

const Home = () => {
  const [books, setBooks] = React.useState([])
  const [start, setStart] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [order, setOrder] = React.useState('relevance')
  let search = ''
  // https://www.googleapis.com/books/v1/volumes?q=inauthor:daniel+keyes+intitle:flowers+subject:&orderBy=newest&printType=books&startIndex=0

  React.useEffect(() => {
    findBooks()
  }, [])

  const findBooks = async () => {
    console.log('here')
    setLoading(true)
    search = document.getElementById('search-bar').value
      ? document.getElementById('title').value
      : ''
    let url =
      'https://www.googleapis.com/books/v1/volumes?q=' +
      search.replace(' ', '+') +
      '&orderBy=' +
      order +
      '&printType=books' +
      '&startIndex=0'
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
      newIndex
    console.log(newUrl)
    setStart(newIndex)
    const res = await fetch(newUrl)
    const data = await res.json()
    console.log(data.items)
    const currBooks = books
    const newBooks = [...currBooks, ...data.items]
    setBooks(newBooks)
  }

  return (
    <div>
      <header>
        <div className="title">Book Finder</div>
        <div className="subtitle">Created using the Google Books API</div>
      </header>
      <div className="query-fields">
        <input
          id="search-bar"
          placeholder="Search using Titles, Authors, and more"
          type="text"
        />
        <input type="button" onClick={findBooks} value="Search Library" />
      </div>
      {books.length > 0 ? (
        <div className={'container'}>
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
          </InfiniteScroll>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '5%', fontSize: '20px' }}>
          There are no books that match your search!!
        </div>
      )}
    </div>
  )
}
// AIzaSyCiIlPznTKezMBJ_8vZLi2N_Uaa_Vo2X-8
export default Home