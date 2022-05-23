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
              <label>{data.volumeInfo.title}</label>
              <label>
                {data.volumeInfo.authors ? (
                  <a>{data.volumeInfo.authors[0]}</a>
                ) : (
                  <div>Unknown author</div>
                )}
              </label>
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
