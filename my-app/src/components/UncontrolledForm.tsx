import { useRef, useState } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, updateCountries, updateUserData } from '../slices/appSlice'
import { useNavigate } from 'react-router-dom'
import { ValidationErrors } from './types'
import { schema } from './yup'
import ViewForm from './ViewForm'

function UncontrolledForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isHiddenListCountries, setIsHiddenListCountries] = useState(true)
  const countries = useSelector((state: RootState) => state.app.countries)
  const [coutriesArr] = useState(countries)
  const country = useSelector((state: RootState) => state.app.userData.country)

  const [selectedGender, setSelectedGender] = useState('')

  const nameRef = useRef<HTMLInputElement | null>(null)
  const ageRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const passwordDubRef = useRef<HTMLInputElement | null>(null)
  const genderRef = useRef<HTMLInputElement | null>(null)
  const termsAcceptedRef = useRef<HTMLInputElement | null>(null)
  const imageRef = useRef<HTMLInputElement | null>(null)
  const countryRef = useRef<HTMLInputElement | null>(null)

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

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

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      yourName: nameRef.current?.value,
      yourAge: ageRef.current?.value,
      yourEmail: emailRef.current?.value,
      yourPassword: passwordRef.current?.value,
      yourPasswordDub: passwordDubRef.current?.value,
      gender: selectedGender,
      termsAccepted: termsAcceptedRef.current?.checked,
      image: imageRef.current?.files,
      country: countryRef.current?.value,
    }
    schema
      .validate(data, { abortEarly: false })
      .then((validData) => {
        const readerFile = new FileReader()
        readerFile.readAsDataURL(validData.image[0])
        readerFile.onloadend = () => {
          const base64 = readerFile.result as string
          setValidationErrors({})
          const dataTest = {
            name: data.yourName,
            age: Number(data.yourAge),
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
          navigate('/')
        }
      })
      .catch((errors) => {
        console.error('Errors:', errors)
        const newValidationErrors: { [key: string]: yup.ValidationError } = {}
        errors.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            newValidationErrors[error.path] = error
          }
        })
        setValidationErrors(newValidationErrors)
      })
  }

  function handleGenderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedGender(e.target.value)
  }

  return (
    <ViewForm
      isHiddenListCountries={isHiddenListCountries}
      country={country}
      countries={countries}
      onSelectCountry={onSelectCountry}
      onClickCountry={onClickCountry}
      onChangeCountry={onChangeCountry}
      onSubmitHandler={onSubmitHandler}
      handleGenderChange={handleGenderChange}
      selectedGender={selectedGender}
      validationErrors={validationErrors}
      nameRef={nameRef}
      ageRef={ageRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
      passwordDubRef={passwordDubRef}
      genderRef={genderRef}
      termsAcceptedRef={termsAcceptedRef}
      imageRef={imageRef}
      countryRef={countryRef}
    />
  )
}

export default UncontrolledForm
