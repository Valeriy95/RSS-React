import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IObjectData {
  yourName: string
  yourAge: number
  yourEmail: string
  yourPassword: string
  yourPasswordDub: string
  gender: string
  termsAccepted: boolean
  image: FileList
  country: string
}

export interface IDataYup {
  yourName: string
  yourAge: number
  yourEmail: string
  yourPassword: string
  yourPasswordDub: string
  gender: NonNullable<'male' | 'female' | undefined>
  termsAccepted: NonNullable<boolean>
  image: FileList
  country: string
}

export interface IUserData {
  name: string
  age: number
  email: string
  password: string
  passwordDub: string
  gender: string
  termsAccepted: boolean
  image: string
  country: string
  isRegistrate: boolean
}

export interface ValidationErrors {
  yourName?: ErrorData
  yourAge?: ErrorData
  yourEmail?: ErrorData
  yourPassword?: ErrorData
  yourPasswordDub?: ErrorData
  gender?: ErrorData
  termsAccepted?: ErrorData
  image?: ErrorData
  country?: ErrorData
}

interface ErrorData {
  errors: string[]
  inner: []
  message: string
  name: string
  params: {
    label: undefined
    originalValue: string
    path: string
    spec: string
    value: string
  }
  path: string
  type: string
  value: string
}

export interface IViewForm {
  isHiddenListCountries?: boolean
  country: string
  countries?: string[]
  onSelectCountry?: (selectedCountry: string) => void
  onClickCountry?: () => void
  onChangeCountry?: (e: React.ChangeEvent<HTMLInputElement>) => void

  onSubmitHandler?: (e: React.FormEvent<HTMLFormElement>) => void
  handleGenderChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedGender?: string
  validationErrors?: ValidationErrors
  nameRef?: React.RefObject<HTMLInputElement>
  ageRef?: React.RefObject<HTMLInputElement>
  emailRef?: React.RefObject<HTMLInputElement>
  passwordRef?: React.RefObject<HTMLInputElement>
  passwordDubRef?: React.RefObject<HTMLInputElement>
  genderRef?: React.RefObject<HTMLInputElement>
  termsAcceptedRef?: React.RefObject<HTMLInputElement>
  imageRef?: React.RefObject<HTMLInputElement>
  countryRef?: React.RefObject<HTMLInputElement>

  onSubmit?: (data: IObjectData) => void
  register?: UseFormRegister<IDataYup>
  handleSubmit?: (
    onSubmit: (data: IObjectData) => void,
  ) => (e: React.FormEvent<HTMLFormElement>) => void
  errors?: FieldErrors<IDataYup>

  name?: string
  age?: number
  email?: string
  password?: string
  passwordDub?: string
  gender?: string
  termsAccepted?: boolean
  image?: string
}
