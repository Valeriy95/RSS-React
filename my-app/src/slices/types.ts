export interface IAppState {
  userData: {
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
  countries: string[]
}
