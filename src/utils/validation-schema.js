import * as yup from 'yup'

const schema = fields => {
  const validationSchema = {}
  fields.forEach(({ field, level }) => {
    switch (field) {
      case 'username':
        switch (level) {
          case 'required':
            validationSchema[field] = yup.string().trim().required('Username is required')
            break
          default:
            validationSchema[field] = yup
              .string()
              .trim()
              .required('Username is required')
              .matches(
                /^[a-z][a-z0-9_]*$/,
                'Username must be lowercase and can contain only letters, numbers and underscores'
              )
              .min(3, 'Username must be at least 3 characters long')
              .max(13, 'Username cannot exceed 13 characters')
            break
        }
        break
      case 'email':
        switch (level) {
          default:
            validationSchema[field] = yup.string().trim().email('Invalid email format').required('Email is required')
            break
        }
        break
      case 'otp':
        switch (level) {
          default:
            validationSchema[field] = yup.array().of(
              yup
                .string()
                .trim()
                .matches(/^\d{1}$/, 'OTP must be a 6-digit number')
                .required('OTP is required')
            )
            break
        }
        break
      case 'password':
        switch (level) {
          case 'required':
            validationSchema[field] = yup.string().trim().required('Password is required')
            break
          default:
            validationSchema[field] = yup
              .string()
              .trim()
              .required('Password is required')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
              )
              .min(8, 'Password must be at least 8 characters long')
            break
        }
        break
      case 'confirmPassword':
        switch (level) {
          default:
            validationSchema[field] = yup
              .string()
              .trim()
              .oneOf([yup.ref('password'), null], 'Password must match')
              .required('Confirm password is required')
            break
        }
        break
      case 'verificationSign':
        switch (level) {
          default:
            validationSchema[field] = yup.string().trim().required('Verification sign is required')
            break
        }
      case 'fileName':
        switch (level) {
          default:
            validationSchema[field] = yup.string().trim().required('Filename is required')
        }
      default:
        break
    }
  })
  return yup.object(validationSchema)
}

export default schema
