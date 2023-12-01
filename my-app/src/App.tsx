import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Form1 from './components/Form1'
import { useSelector } from 'react-redux'
import { RootState } from './slices/appSlice'
import FinishForm from './components/FinishForm'

function App() {
  const isRegistrate = useSelector((state: RootState) => state.app.isRegistrate)

  return (
    <div>
      {/* <Routes> */}
      <div className="container">
        <Link to="/page_1" className="link">
          Form 1
        </Link>
        <Link to="/page_2" className="link">
          Form 2
        </Link>
      </div>
      <div>
      {isRegistrate === true ? <FinishForm /> : null}
      </div>
      <Routes>
        <Route path="/page_1" element={<Form1 />} />
        <Route path="/page_2" element={<Form1 />} />
      </Routes>
    </div>
  )
}

export default App
