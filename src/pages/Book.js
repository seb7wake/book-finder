import React, { useEffect } from 'react'
// import { Markup } from 'interweave'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
} from 'react-router-dom'
import Loading from '../components/Loading'
import '../book-styles.css'

const Book = (props) => {
  const { book } = useParams()
  const [data, setData] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [imgLoading, setImgLoading] = React.useState(false)

  useEffect(() => {
    getBook()
  }, [book])

  const getBook = async () => {
    setLoading(true)
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${book}`,
    )
    const data = await res.json()
    if (!data.error) {
      setImgLoading(true)
      setData(data)
      setImgLoading(false)
      console.log(data)
    } else {
      setData()
    }
    setLoading(false)
  }

  if (loading || imgLoading) {
    return <Loading />
  } else {
    return (
      <div>
        {data ? (
          <div className="book-container">
            <div className="book-cover">
              <img
                src={data.volumeInfo.imageLinks.small}
                alt="Book Preview"
                className={'img-loaded'}
                onLoad={() => setImgLoading(false)}
              />
            </div>
            <div className="book-details">
              <label style={{ fontSize: '32px' }}>
                {data.volumeInfo.title}
              </label>
              <br />
              <label>
                {data.volumeInfo.authors ? (
                  <Link
                    to={
                      '/search?keyword=' +
                      data.volumeInfo.authors[0].replace(' ', '+')
                    }
                  >
                    <div className="authors">{data.volumeInfo.authors[0]}</div>
                  </Link>
                ) : (
                  <div>Unknown author</div>
                )}
              </label>
              <br />
              <table>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: data.volumeInfo.description,
                      }}
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>No information available for this book!</div>
        )}
      </div>
    )
  }
}

export default Book
