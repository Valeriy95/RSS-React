import * as yup from 'yup'

export const schema = yup.object().shape({
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
        return value[0].size <= 1024 * 1024
      }
      return true
    })
    .test('fileFormat', 'Invalid file format', (value) => {
      if (value && value.length > 0 && value[0].type) {
        return ['image/png', 'image/jpeg'].includes(value[0].type)
      }
      return true
    }),
  country: yup.string().required('Choose the country'),
})
