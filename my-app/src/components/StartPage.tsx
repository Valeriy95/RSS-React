import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../slices/appSlice'
import CompletedForm from './CompletedForm'

function StartPage() {
  const isRegistrate = useSelector(
    (state: RootState) => state.app.userData.isRegistrate,
  )

  return (
    <>
      <div className="container">
        <Link to="/page_1" className="link">
          Controlled Form
        </Link>
        <Link to="/page_2" className="link">
          Uncontrolled Form
        </Link>
      </div>
      <div>{isRegistrate === true ? <CompletedForm /> : null}</div>
    </>
  )
}

export default StartPage
