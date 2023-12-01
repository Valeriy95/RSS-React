import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, updateAge, updateCountries, updateCountry, updateEmail, updateGender, updateImage, updateIsRegistrate, updateName, updatePassword, updatePasswordDub, updateTermsAccepted } from '../slices/appSlice'
import { useNavigate } from 'react-router-dom'
import { IObjectData } from './types'

const schema = yup.object().shape({
  yourName: yup
    .string()
    .required('The "Name" field is required.')
    .matches(/^[A-Z]/, 'The first letter must be uppercased'),
  yourAge: yup
    .number()
    .required('The "Age" field is required.')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  yourEmail: yup
    .string()
    .required('The "Email" field is required.')
    .email('Enter a correct email'),
  yourPassword: yup
    .string()
    .required('The "Password" field is required.')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      'The password must contain: at least 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character and be at least 8 characters long.',
    ),
  yourPasswordDub: yup
    .string()
    .oneOf([yup.ref('yourPassword')], 'Passwords must match')
    .required('The "Repeat password" field is required.'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Select gender')
    .required('Select gender'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'Accept the terms and conditions')
    .required('Accept the terms and conditions'),
  image: yup
  .mixed<FileList>()
  .required('Upload an image')
  .test('fileSize', 'File size is too large', (value) => {
    if (value && value.length > 0 && value[0].size) {
      return value[0].size <= 1024 * 1024;
    }
    return true;
  })
  .test('fileFormat', 'Invalid file format', (value) => {
    if (value && value.length > 0 && value[0].type) {
      return ['image/png', 'image/jpeg'].includes(value[0].type);
    }
    return true;
  }),
    // .mixed()
    // .required('Upload an image')
    // .test('fileSize', 'File size is too large', (value) => {
    //   if (!value) return true // allow empty file (no file selected)
    //   return value[0].size <= 1024 * 1024 // 1 MB
    // })
    // .test('fileFormat', 'Invalid file format', (value) => {
    //   if (!value) return true // allow empty file (no file selected)
    //   return ['image/png', 'image/jpeg'].includes(value[0].type)
    // }),
  country: yup.string().required('Choose the country'),
})

function Form1() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isHiddenListCountries, setIsHiddenListCountries] = useState(true)
  let countries = useSelector((state: RootState) => state.app.countries)
  const countriesTest = useSelector(
    (state: RootState) => state.app.countriesTest,
  )
  const country = useSelector(
    (state: RootState) => state.app.country,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSelectCountry = (selectedCountry: string) => {
    dispatch(updateCountry(selectedCountry))
  }

  const onClickCountry = () => {
    setIsHiddenListCountries(false);
  }

  dispatch(updateIsRegistrate(false))

  const onChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(updateCountry(value)) 
    countries = countriesTest

    const filteredCountries = countries.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase()),
    )
    dispatch(updateCountries(filteredCountries))
  }

  function onSubmitHandler(data: IObjectData) {
  
    const readerFile = new FileReader();
    readerFile.readAsDataURL(data.image[0]);
    readerFile.onloadend = () => {
      const base64 = readerFile.result as string;
      dispatch(updateImage(base64))
    };

    dispatch(updateName(data.yourName))
    dispatch(updateAge(data.yourAge))
    dispatch(updateEmail(data.yourEmail))
    dispatch(updatePassword(data.yourPassword))
    dispatch(updatePasswordDub(data.yourPasswordDub))
    dispatch(updateGender(data.gender))
    dispatch(updateTermsAccepted(data.termsAccepted))
    dispatch(updateCountry(data.country))
    dispatch(updateIsRegistrate(true));
    navigate('/')
  }


  return (
    <div className='list-container'>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="item-container">
          <div className='item-wrapper'>
          <label htmlFor="yourName" className='title'>Name:</label>
          <input
            {...register('yourName')}
            type="text"
            id="yourName"
            name="yourName"
            className='input'
          /> 
          </div>
          <p className='text-error'>{errors.yourName?.message}</p>
        </div>

        <div className="item-container">
        <div className='item-wrapper'>
        <label htmlFor="yourAge" className='title'>Age:</label>
          <input
            {...register('yourAge')}
            type="number"
            id="yourAge"
            name="yourAge"
            className='input'
          />
        </div>
          <p className='text-error'>{errors.yourAge?.message}</p>
        </div>

        <div className="item-container">
          <div className='item-wrapper'>
          <label htmlFor="yourEmail" className='title'>Email:</label>
          <input
            {...register('yourEmail')}
            type="email"
            id="yourEmail"
            name="yourEmail"
            className='input'
          />
          </div>
          <p className='text-error'>{errors.yourEmail?.message}</p>
        </div>

        <div className="item-container">
          <div className='item-wrapper'>
          <label htmlFor="yourPassword" className='title'>Password:</label>
          <input
            {...register('yourPassword')}
            type="password"
            id="yourPassword"
            name="yourPassword"
            className='input'
          />
          </div>
          <p className='text-error'>{errors.yourPassword?.message}</p>
        </div>

        <div className="item-container">
          <div className='item-wrapper'>
          <label htmlFor="yourPasswordDub" className='title'>Repeat password:</label>
          <input
            {...register('yourPasswordDub')}
            type="password"
            id="yourPasswordDub"
            name="yourPasswordDub"
            className='input'
          />
          </div>
          <p className='text-error'>{errors.yourPasswordDub?.message}</p>
        </div>

        <div className="item-container">
          <div>
          <label className='title gender'>
          Select gender:
            <input
              {...register('gender')}
              type="radio"
              name="gender"
              value="male"
            />
            Male
          </label>
          <label className='title gender'>
            <input
              {...register('gender')}
              type="radio"
              name="gender"
              value="female"
            />
            Female
          </label>
          </div>
          <p className='text-error'>{errors.gender?.message}</p>
        </div>

        <div className="item-container">
          <div>
          <label className='title termsAccepted'>
            <input
              {...register('termsAccepted')}
              type="checkbox"
            />
            Accept terms and conditions
          </label>
          </div>
          <p className='text-error'>{errors.termsAccepted?.message}</p>
        </div>

        <div className="item-container">
          <div className='item-wrapper'>
          <label className='title'>
          Upload an image
          </label>
            <input
              {...register('image')}
              type="file"
              accept=".png, .jpg"
              className='input-image'
            />
          </div>
          <p className='text-error'>{errors.image?.message}</p>
        </div>

        <div className="item-container list-countries">
          <div className='item-wrapper'>
          <label htmlFor="country" className='title'>Choose the country:</label>
          <input
            {...register('country')}
            type="text"
            id="country"
            value={country}
            onInput={onChangeCountry}
            onClick={onClickCountry}
            className='input'
          />
          </div>
          <ul className={`item-country ${isHiddenListCountries ? 'hidden' : ''}`}>
            {countries.map((country) => (
              <li className='country' key={country} onClick={() => onSelectCountry(country)}>
                {country}
              </li>
            ))}
          </ul>
          <p className='text-error'>{errors.country?.message}</p>
        </div>

        <button className='btn-submit' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form1
