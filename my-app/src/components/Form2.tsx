import { useRef, useState } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  RootState,
  updateAge,
  updateCountries,
  updateCountry,
  updateEmail,
  updateGender,
  updateImage,
  updateIsRegistrate,
  updateName,
  updatePassword,
  updatePasswordDub,
  updateTermsAccepted,
} from '../slices/appSlice'
import { useNavigate } from 'react-router-dom'
import { ValidationErrors } from './types'
import { schema } from './yup'

function Form2() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isHiddenListCountries, setIsHiddenListCountries] = useState(true)
  let countries = useSelector((state: RootState) => state.app.countries)
  const countriesList = useSelector(
    (state: RootState) => state.app.countriesList,
  )
  const country = useSelector((state: RootState) => state.app.country)

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
    dispatch(updateCountry(selectedCountry))
  }

  const onClickCountry = () => {
    setIsHiddenListCountries(false)
  }

  const onChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(updateCountry(value))
    countries = countriesList
    const filteredCountries = countries.filter((country) =>
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
          dispatch(updateName(validData.yourName))
          dispatch(updateAge(validData.yourAge))
          dispatch(updateEmail(validData.yourEmail))
          dispatch(updatePassword(validData.yourPassword))
          dispatch(updatePasswordDub(validData.yourPasswordDub))
          dispatch(updateGender(validData.gender))
          dispatch(updateTermsAccepted(validData.termsAccepted))
          dispatch(updateImage(base64))
          dispatch(updateCountry(validData.country))
          dispatch(updateIsRegistrate(true))
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
    <div className="list-container">
      <form onSubmit={onSubmitHandler}>
        <div className="item-container">
          <div className="item-wrapper">
            <label htmlFor="yourName" className="title">
              Name:
            </label>
            <input
              ref={nameRef}
              type="text"
              id="yourName"
              name="yourName"
              className="input"
            />
          </div>
          <p className="text-error">{validationErrors.yourName?.message}</p>
        </div>

        <div className="item-container">
          <div className="item-wrapper">
            <label htmlFor="yourAge" className="title">
              Age:
            </label>
            <input
              ref={ageRef}
              type="number"
              id="yourAge"
              name="yourAge"
              className="input"
            />
          </div>
          <p className="text-error">{validationErrors.yourAge?.message}</p>
        </div>

        <div className="item-container">
          <div className="item-wrapper">
            <label htmlFor="yourEmail" className="title">
              Email:
            </label>
            <input
              ref={emailRef}
              type="email"
              id="yourEmail"
              name="yourEmail"
              className="input"
            />
          </div>
          <p className="text-error">{validationErrors.yourEmail?.message}</p>
        </div>

        <div className="item-container">
          <div className="item-wrapper">
            <label htmlFor="yourPassword" className="title">
              Password:
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="yourPassword"
              name="yourPassword"
              className="input"
            />
          </div>
          <p className="text-error">{validationErrors.yourPassword?.message}</p>
        </div>

        <div className="item-container">
          <div className="item-wrapper">
            <label htmlFor="yourPasswordDub" className="title">
              Repeat password:
            </label>
            <input
              ref={passwordDubRef}
              type="password"
              id="yourPasswordDub"
              name="yourPasswordDub"
              className="input"
            />
          </div>
          <p className="text-error">
            {validationErrors.yourPasswordDub?.message}
          </p>
        </div>

        <div className="item-container">
          <div>
            <label className="title gender">
              Select gender:
              <input
                ref={genderRef}
                type="radio"
                name="gender"
                value="male"
                checked={selectedGender === 'male'}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label className="title gender">
              <input
                ref={genderRef}
                type="radio"
                name="gender"
                value="female"
                checked={selectedGender === 'female'}
                onChange={handleGenderChange}
              />
              Female
            </label>
          </div>
          <p className="text-error">{validationErrors.gender?.message}</p>
        </div>

        <div className="item-container">
          <div>
            <label className="title termsAccepted">
              <input ref={termsAcceptedRef} type="checkbox" />
              Accept terms and conditions
            </label>
          </div>
          <p className="text-error">
            {validationErrors.termsAccepted?.message}
          </p>
        </div>

        <div className="item-container">
          <div className="item-wrapper">
            <p className="title">Image</p>
            <label htmlFor="image" className="label-image">
              Upload an image
            </label>
            <input
              ref={imageRef}
              type="file"
              id="image"
              className="input-image"
            />
          </div>
          <p className="text-error">{validationErrors.image?.message}</p>
        </div>

        <div className="item-container list-countries">
          <div className="item-wrapper">
            <label htmlFor="country" className="title">
              Choose the country:
            </label>
            <input
              ref={countryRef}
              type="text"
              id="country"
              value={country}
              onInput={onChangeCountry}
              onClick={onClickCountry}
              className="input"
            />
          </div>
          <ul
            className={`item-country ${isHiddenListCountries ? 'hidden' : ''}`}
          >
            {countries.map((country) => (
              <li
                className="country"
                key={country}
                onClick={() => onSelectCountry(country)}
              >
                {country}
              </li>
            ))}
          </ul>
          <p className="text-error">{validationErrors.country?.message}</p>
        </div>

        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form2
