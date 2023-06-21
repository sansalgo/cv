import connectToDatabase from '@/lib/mongodb'
import User from '@/models/user'

const defaultErrorOptions = { accountError: true, conflictError: true, retrievalError: true, serverError: true }

const userCheck = async ({ username, email, errorOptions = {}}, ) => {
  errorOptions = { ...defaultErrorOptions, ...errorOptions }
  console.log(errorOptions)
  try {
    await connectToDatabase()
    let user = await User.findOne({ username, email }).exec()
    if (user && errorOptions.conflictError) {
      return { status: 409, json: { message: 'User already exists. Please go to login page to login' } }
    }
    user = await User.findOne({ username }).exec()
    if (user && errorOptions.accountError) {
      return {
        status: 400,
        json: { username: { message: 'Username already exists. Please choose a different username' } }
      }
    }
    user = await User.findOne({ email }).exec()
    if (user && errorOptions.accountError) {
      return {
        status: 400,
        json: { email: { message: 'Email already exists. Please use a different email address' } }
      }
    }
    if (errorOptions.retrievalError)
      return { status: 404, json: { message: 'User not found. Please check the entered username or email' } }
  } catch (error) {
    console.error(error)
    if (errorOptions.serverError) {
      return { status: 500, json: { message: 'Internal server error' } }
    }
  }
}

export default userCheck
