import './App.css'
import { Route, Routes } from 'react-router-dom'
import StartPage from './components/StartPage'
import UncontrolledForm from './components/UncontrolledForm'
import ControlledForm from './components/ControlledForm'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/page_1" element={<ControlledForm />} />
        <Route path="/page_2" element={<UncontrolledForm />} />
      </Routes>
    </>
  )
}

export default App
