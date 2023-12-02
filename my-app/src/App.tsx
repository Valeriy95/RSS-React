import './App.css'
import { Route, Routes } from 'react-router-dom'
import Form1 from './components/Form1'
import Form2 from './components/Form2'
import StartPage from './components/StartPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/page_1" element={<Form1 />} />
        <Route path="/page_2" element={<Form2 />} />
      </Routes>
    </>
  )
}

export default App
