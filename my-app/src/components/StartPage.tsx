import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../slices/appSlice'
import CompletedForm from './CompletedForm'

function StartPage() {
  const isRegistrate = useSelector((state: RootState) => state.app.isRegistrate)

  return (
    <>
      <div className="container">
        <Link to="/page_1" className="link">
          Form 1
        </Link>
        <Link to="/page_2" className="link">
          Form 2
        </Link>
      </div>
      <div>{isRegistrate === true ? <CompletedForm /> : null}</div>
    </>
  )
}

export default StartPage
