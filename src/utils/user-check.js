const { default: connectToDatabase } = require('@/lib/mongodb')
const { default: User } = require('@/models/user')

const userCheck = async ({username, email}) => {
  try {
    await connectToDatabase()
    let user = await User.findOne({ username, email }).exec()
    if (user) {
      return { status: 422, json: { error: 'User already exists. Please go to login page to login' } }
    }
    user = await User.findOne({ username }).exec()
    if (user) {
      return {
        status: 409,
        json: { username: { message: 'Username already exists. Please choose a different username' } }
      }
    }
    user = await User.findOne({ email }).exec()
    if (user) {
      return {
        status: 409,
        json: { email: { message: 'Email already exists. Please use a different email address' } }
      }
    }
    return { status: 404, json: { error: 'User not found. Please check the entered username or email' } }
  } catch (error) {
    console.error(error)
    return { status: 500, json: { message: 'Internal server error' } }
  }
}

export default userCheck
