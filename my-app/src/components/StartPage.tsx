import { Link } from 'react-router-dom'
import FinishForm from './FinishForm'
import { useSelector } from 'react-redux'
import { RootState } from '../slices/appSlice'

function StartPage() {
  const isRegistrate = useSelector((state: RootState) => state.app.isRegistrate)

  return (
    <div>
      <div className="container">
        <Link to="/page_1" className="link">
          Form 1
        </Link>
        <Link to="/page_2" className="link">
          Form 2
        </Link>
      </div>
      <div>{isRegistrate === true ? <FinishForm /> : null}</div>
    </div>
  )
}

export default StartPage
