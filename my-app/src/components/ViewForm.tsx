import { IViewForm } from './types'

const ViewForm: React.FC<IViewForm> = ({
  isHiddenListCountries,
  country,
  countries,
  onSelectCountry,
  onClickCountry,
  onChangeCountry,
  onSubmitHandler,
  handleGenderChange,
  selectedGender,
  validationErrors,
  nameRef,
  ageRef,
  emailRef,
  passwordRef,
  passwordDubRef,
  genderRef,
  termsAcceptedRef,
  imageRef,
  countryRef,
  onSubmit,
  register,
  handleSubmit,
  errors,

  name,
  age,
  email,
  password,
  passwordDub,
  gender,
  termsAccepted,
  image,
}) => {
  return (
    <>
      {register && handleSubmit && onSubmit && onSelectCountry ? (
        <div className="list-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourName" className="title">
                  Name:
                </label>
                <input
                  {...register('yourName')}
                  type="text"
                  id="yourName"
                  name="yourName"
                  className="input"
                />
              </div>
              <p className="text-error">{errors?.yourName?.message}</p>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourAge" className="title">
                  Age:
                </label>
                <input
                  {...register('yourAge')}
                  type="number"
                  id="yourAge"
                  name="yourAge"
                  className="input"
                />
              </div>
              <p className="text-error">{errors?.yourAge?.message}</p>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourEmail" className="title">
                  Email:
                </label>
                <input
                  {...register('yourEmail')}
                  type="email"
                  id="yourEmail"
                  name="yourEmail"
                  className="input"
                />
              </div>
              <p className="text-error">{errors?.yourEmail?.message}</p>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourPassword" className="title">
                  Password:
                </label>
                <input
                  {...register('yourPassword')}
                  type="password"
                  id="yourPassword"
                  name="yourPassword"
                  className="input"
                />
              </div>
              <p className="text-error">{errors?.yourPassword?.message}</p>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourPasswordDub" className="title">
                  Repeat password:
                </label>
                <input
                  {...register('yourPasswordDub')}
                  type="password"
                  id="yourPasswordDub"
                  name="yourPasswordDub"
                  className="input"
                />
              </div>
              <p className="text-error">{errors?.yourPasswordDub?.message}</p>
            </div>

            <div className="item-container">
              <div>
                <label className="title gender">
                  Select gender:
                  <input
                    {...register('gender')}
                    type="radio"
                    name="gender"
                    value="male"
                  />
                  Male
                </label>
                <label className="title gender">
                  <input
                    {...register('gender')}
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  Female
                </label>
              </div>
              <p className="text-error">{errors?.gender?.message}</p>
            </div>

            <div className="item-container">
              <div>
                <label className="title termsAccepted">
                  <input {...register('termsAccepted')} type="checkbox" />
                  Accept terms and conditions
                </label>
              </div>
              <p className="text-error">{errors?.termsAccepted?.message}</p>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <p className="title">Image</p>
                <label htmlFor="image" className="label-image">
                  Upload an image
                </label>
                <input
                  {...register('image')}
                  type="file"
                  id="image"
                  className="input-image"
                />
              </div>
              <p className="text-error">{errors?.image?.message}</p>
            </div>

            <div className="item-container list-countries">
              <div className="item-wrapper">
                <label htmlFor="country" className="title">
                  Choose the country:
                </label>
                <input
                  {...register('country')}
                  type="text"
                  id="country"
                  value={country}
                  onInput={onChangeCountry}
                  onClick={onClickCountry}
                  className="input"
                />
              </div>
              <ul
                className={`item-country ${
                  isHiddenListCountries ? 'hidden' : ''
                }`}
              >
                {countries?.map((country) => (
                  <li
                    className="country"
                    key={country}
                    onClick={() => onSelectCountry(country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
              <p className="text-error">{errors?.country?.message}</p>
            </div>

            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : validationErrors && onSelectCountry ? (
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
              <p className="text-error">
                {validationErrors?.yourName?.message}
              </p>
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
              <p className="text-error">{validationErrors?.yourAge?.message}</p>
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
              <p className="text-error">
                {validationErrors?.yourEmail?.message}
              </p>
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
              <p className="text-error">
                {validationErrors?.yourPassword?.message}
              </p>
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
                {validationErrors?.yourPasswordDub?.message}
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
              <p className="text-error">{validationErrors?.gender?.message}</p>
            </div>

            <div className="item-container">
              <div>
                <label className="title termsAccepted">
                  <input ref={termsAcceptedRef} type="checkbox" />
                  Accept terms and conditions
                </label>
              </div>
              <p className="text-error">
                {validationErrors?.termsAccepted?.message}
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
              <p className="text-error">{validationErrors?.image?.message}</p>
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
                className={`item-country ${
                  isHiddenListCountries ? 'hidden' : ''
                }`}
              >
                {countries?.map((country) => (
                  <li
                    className="country"
                    key={country}
                    onClick={() => onSelectCountry(country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
              <p className="text-error">{validationErrors?.country?.message}</p>
            </div>

            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="list-container">
          <form>
            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourName" className="title">
                  Name:
                </label>
                <input
                  disabled
                  value={name}
                  type="text"
                  id="yourName"
                  name="yourName"
                />
              </div>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourAge" className="title">
                  Age:
                </label>
                <input
                  disabled
                  value={age}
                  type="number"
                  id="yourAge"
                  name="yourAge"
                />
              </div>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourEmail" className="title">
                  Email:
                </label>
                <input
                  disabled
                  value={email}
                  type="email"
                  id="yourEmail"
                  name="yourEmail"
                />
              </div>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourPassword" className="title">
                  Password:
                </label>
                <input
                  disabled
                  value={password}
                  type="password"
                  id="yourPassword"
                  name="yourPassword"
                />
              </div>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label htmlFor="yourPasswordDub" className="title">
                  Repeat password:
                </label>
                <input
                  disabled
                  value={passwordDub}
                  type="password"
                  id="yourPasswordDub"
                  name="yourPasswordDub"
                />
              </div>
            </div>

            <div className="item-container">
              <div className="item-wrapper">
                <label className="title">Gender:</label>
                <input disabled value={gender} type="text" name="gender" />
              </div>
            </div>

            <div className="item-container">
              <div>
                <input disabled type="checkbox" checked={termsAccepted} />
                <label className="title">Accept terms and conditions</label>
              </div>
            </div>

            <div className="item-container">
              <img className="image-container" src={image} alt="image" />
            </div>

            <div className="item-container list-countries">
              <div className="item-wrapper">
                <label htmlFor="country" className="title">
                  Country:
                </label>
                <input disabled type="text" id="country" value={country} />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default ViewForm
