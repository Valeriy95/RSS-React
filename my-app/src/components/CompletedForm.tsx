import { useSelector } from 'react-redux'
import ViewForm from './ViewForm'
import { RootState } from '../slices/appSlice'

function CompletedForm() {
  const name = useSelector((state: RootState) => state.app.userData.name)
  const age = useSelector((state: RootState) => state.app.userData.age)
  const email = useSelector((state: RootState) => state.app.userData.email)
  const password = useSelector(
    (state: RootState) => state.app.userData.password,
  )
  const passwordDub = useSelector(
    (state: RootState) => state.app.userData.passwordDub,
  )
  const gender = useSelector((state: RootState) => state.app.userData.gender)
  const termsAccepted = useSelector(
    (state: RootState) => state.app.userData.termsAccepted,
  )
  const country = useSelector((state: RootState) => state.app.userData.country)
  const image = useSelector((state: RootState) => state.app.userData.image)

  return (
    <ViewForm
      name={name}
      age={age}
      email={email}
      password={password}
      passwordDub={passwordDub}
      gender={gender}
      termsAccepted={termsAccepted}
      country={country}
      image={image}
    />
  )
}

export default CompletedForm
