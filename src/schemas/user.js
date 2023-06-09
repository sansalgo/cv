import * as yup from 'yup'

const userSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .matches(/^[a-z][a-z0-9_]*$/, 'Username must be lowercase and can contain only letters, numbers and underscores')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username cannot exceed 13 characters'),
  email: yup.string().email('Invalid email format').required('Email is required')
})

export default userSchema
