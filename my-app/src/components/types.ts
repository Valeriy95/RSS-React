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

// export interface IObjectDataForm {
//   yourName: string
//   yourAge: number
//   yourEmail: string
//   yourPassword: string
//   yourPasswordDub: string
//   gender: string
//   termsAccepted: boolean
//   image: string
//   country: string
// }

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
