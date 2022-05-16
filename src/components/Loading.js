import React from 'react'
import { BallTriangle, Oval, Grid } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="loading">
      <BallTriangle color="#00BFFF" height={100} width={100} />
    </div>
  )
}

export default Loading
