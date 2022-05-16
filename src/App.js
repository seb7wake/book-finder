import logo from './logo.svg'
import Home from './pages/Home'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
