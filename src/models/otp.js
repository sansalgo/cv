const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema(
  {
    email: String,
    otp: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema)

export default OTP
