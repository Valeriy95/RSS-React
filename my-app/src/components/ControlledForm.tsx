import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, updateCountries, updateUserData } from '../slices/appSlice'
import { IObjectData, IUserData } from './types'
import { useForm } from 'react-hook-form'
import { schema } from './yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ViewForm from './ViewForm'

function ControlledForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isHiddenListCountries, setIsHiddenListCountries] = useState(true)
  const countries = useSelector((state: RootState) => state.app.countries)
  const [coutriesArr] = useState(countries)

  const country = useSelector((state: RootState) => state.app.userData.country)

  const onSelectCountry = (selectedCountry: string) => {
    dispatch(updateUserData({ country: selectedCountry }))
  }

  const onClickCountry = () => {
    setIsHiddenListCountries(false)
  }

  const onChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(updateUserData({ country: value }))

    const filteredCountries = coutriesArr.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase()),
    )
    dispatch(updateCountries(filteredCountries))
  }

  const onSubmitHandler = (data: IObjectData) => {
    const readerFile = new FileReader()
    readerFile.readAsDataURL(data.image[0])
    readerFile.onloadend = () => {
      const base64 = readerFile.result as string
      const dataTest: IUserData = {
        name: data.yourName,
        age: data.yourAge,
        email: data.yourEmail,
        password: data.yourPassword,
        passwordDub: data.yourPasswordDub,
        gender: data.gender,
        termsAccepted: data.termsAccepted,
        country: data.country,
        image: base64,
        isRegistrate: true,
      }
      dispatch(updateUserData(dataTest))
    }
    navigate('/')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <ViewForm
      onSubmit={onSubmitHandler}
      countries={countries}
      country={country}
      onSelectCountry={onSelectCountry}
      onClickCountry={onClickCountry}
      onChangeCountry={onChangeCountry}
      isHiddenListCountries={isHiddenListCountries}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  )
}

export default ControlledForm
