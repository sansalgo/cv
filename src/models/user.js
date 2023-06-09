import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const saltRounds = 10

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
  } catch (error) {
    return false
  }
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
